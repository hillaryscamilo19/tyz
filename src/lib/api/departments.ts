import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Department } from "@/lib/models/types"

export async function getDepartments() {
  const client = await clientPromise
  const db = client.db()

  return db.collection("departments").find().sort({ name: 1 }).toArray()
}

export async function getDepartmentById(id: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de departamento inválido")
  }

  return db.collection("departments").findOne({ _id: new ObjectId(id) })
}

export async function createDepartment(departmentData: Partial<Department>) {
  const client = await clientPromise
  const db = client.db()

  // Verificar si el departamento ya existe
  const existingDepartment = await db.collection("departments").findOne({
    name: departmentData.name,
  })

  if (existingDepartment) {
    throw new Error("Ya existe un departamento con ese nombre")
  }

  const result = await db.collection("departments").insertOne(departmentData)

  return { ...departmentData, _id: result.insertedId }
}

export async function updateDepartment(id: string, departmentData: Partial<Department>) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de departamento inválido")
  }

  delete departmentData._id // Asegurarse de no intentar actualizar el _id

  const result = await db.collection("departments").updateOne({ _id: new ObjectId(id) }, { $set: departmentData })

  return result.modifiedCount > 0
}

export async function deleteDepartment(id: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de departamento inválido")
  }

  // Verificar si hay usuarios o tickets asociados a este departamento
  const usersCount = await db.collection("users").countDocuments({ department: new ObjectId(id) })
  const ticketsCount = await db.collection("tickets").countDocuments({ assigned_department: new ObjectId(id) })

  if (usersCount > 0 || ticketsCount > 0) {
    throw new Error("No se puede eliminar el departamento porque tiene usuarios o tickets asociados")
  }

  const result = await db.collection("departments").deleteOne({ _id: new ObjectId(id) })

  return result.deletedCount > 0
}
