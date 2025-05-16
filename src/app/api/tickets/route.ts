import { type NextRequest, NextResponse } from "next/server"
import { getTickets, createTicket, getTicketStats } from "@/lib/api/tickets"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const stats = searchParams.get("stats")

    if (stats === "true") {
      const statsData = await getTicketStats()
      return NextResponse.json(statsData)
    }

    const filter = {}
    const tickets = await getTickets(filter)

    return NextResponse.json(tickets)
  } catch (error) {
    console.error("Error al obtener tickets:", error)
    return NextResponse.json({ error: "Error al obtener tickets" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await req.json()

    // Asegurarse de que el usuario actual sea el creador
    data.created_user = session.user.id

    const newTicket = await createTicket(data)

    return NextResponse.json(newTicket, { status: 201 })
  } catch (error) {
    console.error("Error al crear ticket:", error)
    return NextResponse.json({ error: "Error al crear ticket" }, { status: 500 })
  }
}
