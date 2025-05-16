import { type NextRequest, NextResponse } from "next/server"
import { getMessagesByTicket, addMessageToTicket } from "@/lib/api/messages"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const messages = await getMessagesByTicket(params.id)

    return NextResponse.json(messages)
  } catch (error) {
    console.error(`Error al obtener mensajes del ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Error al obtener mensajes" }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await req.json()

    // Asegurarse de que el usuario actual sea el creador del mensaje
    data.createdById = session.user.id

    const newMessage = await addMessageToTicket(params.id, data)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error(`Error al añadir mensaje al ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Error al añadir mensaje" }, { status: 500 })
  }
}
