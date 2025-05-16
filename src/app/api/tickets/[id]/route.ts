import { type NextRequest, NextResponse } from "next/server"
import { getTicketById, updateTicketStatus, assignTicketToUsers } from "@/lib/api/tickets"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const ticket = await getTicketById(params.id)

    if (!ticket) {
      return NextResponse.json({ error: "Ticket no encontrado" }, { status: 404 })
    }

    return NextResponse.json(ticket)
  } catch (error) {
    console.error(`Error al obtener ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Error al obtener ticket" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await req.json()

    if (data.status !== undefined) {
      const success = await updateTicketStatus(params.id, data.status)

      if (!success) {
        return NextResponse.json({ error: "No se pudo actualizar el estado del ticket" }, { status: 400 })
      }
    }

    if (data.assigned_users) {
      const success = await assignTicketToUsers(params.id, data.assigned_users)

      if (!success) {
        return NextResponse.json({ error: "No se pudo asignar el ticket a los usuarios" }, { status: 400 })
      }
    }

    const updatedTicket = await getTicketById(params.id)

    return NextResponse.json(updatedTicket)
  } catch (error) {
    console.error(`Error al actualizar ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Error al actualizar ticket" }, { status: 500 })
  }
}
