import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import type { User } from "@/types"

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()
    const user = await db.collection("users").findOne({ username })

    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    return user as User
  } catch (error) {
    console.error("Error al autenticar usuario:", error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) })
    return user as User
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error)
    return null
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const { db } = await connectToDatabase()
    const users = await db.collection("users").find().toArray()
    return users as User[]
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error)
    return []
  }
}

export async function createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()

    // Verificar si el usuario ya existe
    const existingUser = await db.collection("users").findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    })

    if (existingUser) {
      throw new Error("El nombre de usuario o correo electrónico ya está en uso")
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const now = new Date()
    const newUser = {
      ...userData,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("users").insertOne(newUser)

    if (!result.insertedId) {
      throw new Error("Error al crear el usuario")
    }

    const createdUser = await db.collection("users").findOne({ _id: result.insertedId })
    return createdUser as User
  } catch (error) {
    console.error("Error al crear usuario:", error)
    throw error
  }
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()

    // Si se actualiza la contraseña, encriptarla
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10)
    }

    const now = new Date()
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...userData,
          updatedAt: now,
        },
      },
      { returnDocument: "after" },
    )

    return result as User
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    return null
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    return false
  }
}
