import { type NextRequest, NextResponse } from "next/server"
import { getDepartments, createDepartment } from "@/lib/api/departments"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { UserRoles } from "@/lib/models/types"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const departments = await getDepartments()

    return NextResponse.json(departments)
  } catch (error) {
    console.error("Error al obtener departamentos:", error)
    return NextResponse.json({ error: "Error al obtener departamentos" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo los administradores pueden crear departamentos
    if (session.user.role !== UserRoles.ADMIN) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })
    }

    const data = await req.json()

    const newDepartment = await createDepartment(data)

    return NextResponse.json(newDepartment, { status: 201 })
  } catch (error) {
    console.error("Error al crear departamento:", error)
    return NextResponse.json({ error: "Error al crear departamento" }, { status: 500 })
  }
}
