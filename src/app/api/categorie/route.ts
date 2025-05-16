import { type NextRequest, NextResponse } from "next/server"
import { getCategories, createCategory, getCategoriesByDepartment } from "@/lib/api/categories"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { UserRoles } from "@/lib/models/types"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const departmentId = searchParams.get("department")

    if (departmentId) {
      const categories = await getCategoriesByDepartment(departmentId)
      return NextResponse.json(categories)
    }

    const categories = await getCategories()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return NextResponse.json({ error: "Error al obtener categorías" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo los administradores pueden crear categorías
    if (session.user.role !== UserRoles.ADMIN) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })
    }

    const data = await req.json()

    const newCategory = await createCategory(data)

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error("Error al crear categoría:", error)
    return NextResponse.json({ error: "Error al crear categoría" }, { status: 500 })
  }
}
