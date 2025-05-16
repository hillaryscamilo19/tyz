import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { type User, UserRoles } from "@/lib/models/types"
import bcrypt from "bcryptjs"

export async function getUsers(filter = {}) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("users").find(filter).sort({ fullname: 1 }).toArray()
}

export async function getUserById(id: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de usuario inválido")
  }

  return db.collection("users").findOne(
    { _id: new ObjectId(id) },
    { projection: { password: 0 } }, // No devolver la contraseña
  )
}

export async function getUsersByDepartment(departmentId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(departmentId)) {
    throw new Error("ID de departamento inválido")
  }

  return db
    .collection("users")
    .find({ department: new ObjectId(departmentId), status: true })
    .sort({ fullname: 1 })
    .project({ password: 0 }) // No devolver la contraseña
    .toArray()
}

export async function createUser(userData: Partial<User>) {
  const client = await clientPromise
  const db = client.db()

  // Verificar si el usuario ya existe
  const existingUser = await db.collection("users").findOne({
    $or: [{ email: userData.email }, { username: userData.username }],
  })

  if (existingUser) {
    throw new Error("El correo electrónico o nombre de usuario ya está en uso")
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const newUser = {
    ...userData,
    password: hashedPassword,
    role: userData.role || UserRoles.USUARIO,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Convertir string a ObjectId para el departamento
  if (typeof newUser.department === "string" && ObjectId.isValid(newUser.department)) {
    newUser.department = new ObjectId(newUser.department as string)
  }

  const result = await db.collection("users").insertOne(newUser)

  // No devolver la contraseña
  const { password, ...userWithoutPassword } = newUser
  return { ...userWithoutPassword, _id: result.insertedId }
}

export async function updateUser(id: string, userData: Partial<User>) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de usuario inválido")
  }

  const updateData: any = {
    ...userData,
    updatedAt: new Date(),
  }

  // Si se proporciona una nueva contraseña, encriptarla
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10)
  }

  // Convertir string a ObjectId para el departamento
  if (typeof updateData.department === "string" && ObjectId.isValid(updateData.department)) {
    updateData.department = new ObjectId(updateData.department as string)
  }

  delete updateData._id // Asegurarse de no intentar actualizar el _id

  const result = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

  return result.modifiedCount > 0
}

export async function authenticateUser(username: string, password: string) {
  const client = await clientPromise
  const db = client.db()

  const user = await db.collection("users").findOne({ username })

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  // No devolver la contraseña
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}
