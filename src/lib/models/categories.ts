import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Category } from "@/lib/models/types"

export async function getCategories() {
  const client = await clientPromise
  const db = client.db()

  return db.collection("categories").find().sort({ name: 1 }).toArray()
}

export async function getCategoryById(id: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de categoría inválido")
  }

  return db.collection("categories").findOne({ _id: new ObjectId(id) })
}

export async function getCategoriesByDepartment(departmentId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(departmentId)) {
    throw new Error("ID de departamento inválido")
  }

  return db
    .collection("categories")
    .find({ list_departments: new ObjectId(departmentId) })
    .sort({ name: 1 })
    .toArray()
}

export async function createCategory(categoryData: Partial<Category>) {
  const client = await clientPromise
  const db = client.db()

  // Verificar si la categoría ya existe
  const existingCategory = await db.collection("categories").findOne({
    name: categoryData.name,
  })

  if (existingCategory) {
    throw new Error("Ya existe una categoría con ese nombre")
  }

  const newCategory = {
    ...categoryData,
    list_departments: Array.isArray(categoryData.list_departments)
      ? categoryData.list_departments.map((deptId) =>
          typeof deptId === "string" && ObjectId.isValid(deptId) ? new ObjectId(deptId) : deptId,
        )
      : [],
  }

  const result = await db.collection("categories").insertOne(newCategory)

  return { ...newCategory, _id: result.insertedId }
}

export async function updateCategory(id: string, categoryData: Partial<Category>) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de categoría inválido")
  }

  const updateData: any = { ...categoryData }
  delete updateData._id // Asegurarse de no intentar actualizar el _id

  // Convertir strings a ObjectId para los departamentos
  if (Array.isArray(updateData.list_departments)) {
    updateData.list_departments = updateData.list_departments.map((deptId) =>
      typeof deptId === "string" && ObjectId.isValid(deptId) ? new ObjectId(deptId) : deptId,
    )
  }

  const result = await db.collection("categories").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

  return result.modifiedCount > 0
}

export async function deleteCategory(id: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de categoría inválido")
  }

  // Verificar si hay tickets asociados a esta categoría
  const ticketsCount = await db.collection("tickets").countDocuments({ category: new ObjectId(id) })

  if (ticketsCount > 0) {
    throw new Error("No se puede eliminar la categoría porque tiene tickets asociados")
  }

  const result = await db.collection("categories").deleteOne({ _id: new ObjectId(id) })

  return result.deletedCount > 0
}
