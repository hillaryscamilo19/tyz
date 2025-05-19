import { type NextRequest, NextResponse } from "next/server"
import { getAllUsers, createUser } from "@/lib/api/users"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { UserRoles } from "@/lib/models/types"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo los administradores pueden ver todos los usuarios
    if (session.user.role !== UserRoles.ADMIN) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })
    }

    const users = await getAllUsers()

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Solo los administradores pueden crear usuarios
    if (session.user.role !== UserRoles.ADMIN) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })
    }

    const data = await req.json()

    const newUser = await createUser(data)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 })
  }
}
