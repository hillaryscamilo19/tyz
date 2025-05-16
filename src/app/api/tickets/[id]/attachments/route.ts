import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAttachmentsByTicket, saveAttachment } from "@/lib/models/attachments"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const attachments = await getAttachmentsByTicket(params.id)

    return NextResponse.json(attachments)
  } catch (error) {
    console.error(`Error al obtener adjuntos del ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Error al obtener adjuntos" }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 })
    }

    // Convertir el archivo a un formato que pueda ser procesado por el servidor
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileObj = {
      originalname: file.name,
      mimetype: file.type,
      size: file.size,
      buffer,
    }

    const attachment = await saveAttachment(params.id, fileObj)

    return NextResponse.json(attachment, { status: 201 })
  } catch (error) {
    console.error(`Error al añadir adjunto al ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Error al añadir adjunto" }, { status: 500 })
  }
}
