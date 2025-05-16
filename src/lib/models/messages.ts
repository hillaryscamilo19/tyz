import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Message } from "@/lib/models/types"

export async function getMessagesByTicket(ticketId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(ticketId)) {
    throw new Error("ID de ticket inválido")
  }

  const ticket = await db
    .collection("tickets")
    .findOne({ _id: new ObjectId(ticketId) }, { projection: { messages: 1 } })

  if (!ticket || !ticket.messages || ticket.messages.length === 0) {
    return []
  }

  const messageIds = ticket.messages.map((id) => (typeof id === "string" ? new ObjectId(id) : id))

  return db
    .collection("messages")
    .find({ _id: { $in: messageIds } })
    .sort({ createdAt: 1 })
    .toArray()
}

export async function addMessageToTicket(ticketId: string, messageData: Partial<Message>) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(ticketId)) {
    throw new Error("ID de ticket inválido")
  }

  const newMessage = {
    ...messageData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Convertir string a ObjectId para el creador
  if (typeof newMessage.createdById === "string" && ObjectId.isValid(newMessage.createdById)) {
    newMessage.createdById = new ObjectId(newMessage.createdById as string)
  }

  // Insertar el mensaje
  const messageResult = await db.collection("messages").insertOne(newMessage)

  // Actualizar el ticket para incluir el nuevo mensaje
  await db.collection("tickets").updateOne(
    { _id: new ObjectId(ticketId) },
    {
      $push: { messages: messageResult.insertedId },
      $set: { updatedAt: new Date() },
    },
  )

  return { ...newMessage, _id: messageResult.insertedId }
}
