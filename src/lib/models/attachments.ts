
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Attachment } from "@/lib/models/types"
import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"

export async function getAttachmentsByTicket(ticketId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(ticketId)) {
    throw new Error("ID de ticket inválido")
  }

  return db
    .collection("attachments")
    .find({ ticket_id: new ObjectId(ticketId) })
    .toArray()
}

export async function saveAttachment(ticketId: string, file: any) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(ticketId)) {
    throw new Error("ID de ticket inválido")
  }

  // Generar un nombre único para el archivo
  const fileName = file.originalname
  const fileExtension = path.extname(fileName)
  const uniqueFileName = `tyz${Date.now()}${uuidv4().substring(0, 8)}${fileExtension}`
  const filePath = `uploads/${uniqueFileName}`

  // Guardar el archivo en el sistema de archivos
  // Nota: En un entorno real, probablemente querrías usar un servicio de almacenamiento en la nube
  const uploadDir = path.join(process.cwd(), "public/uploads")
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  fs.writeFileSync(path.join(uploadDir, uniqueFileName), file.buffer)

  // Crear el registro de adjunto en la base de datos
  const attachment: Partial<Attachment> = {
    file_name: fileName,
    file_path: filePath,
    file_extension: file.mimetype,
    ticket_id: new ObjectId(ticketId),
  }

  const result = await db.collection("attachments").insertOne(attachment)

  return { ...attachment, _id: result.insertedId }
}

export async function deleteAttachment(attachmentId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(attachmentId)) {
    throw new Error("ID de adjunto inválido")
  }

  // Obtener información del adjunto
  const attachment = await db.collection("attachments").findOne({ _id: new ObjectId(attachmentId) })

  if (!attachment) {
    throw new Error("Adjunto no encontrado")
  }

  // Eliminar el archivo del sistema de archivos
  const filePath = path.join(process.cwd(), "public", attachment.file_path)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  // Eliminar el registro de la base de datos
  const result = await db.collection("attachments").deleteOne({ _id: new ObjectId(attachmentId) })

  return result.deletedCount > 0
}
