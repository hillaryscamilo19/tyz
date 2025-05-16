import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { type Ticket, TicketStatus } from "@/lib/models/types"

export async function getTickets(filter = {}) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("tickets").find(filter).sort({ createdAt: -1 }).toArray()
}

export async function getTicketById(id: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de ticket inválido")
  }

  return db.collection("tickets").findOne({ _id: new ObjectId(id) })
}

export async function getTicketsByUser(userId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(userId)) {
    throw new Error("ID de usuario inválido")
  }

  return db
    .collection("tickets")
    .find({ assigned_users: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getTicketsByDepartment(departmentId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(departmentId)) {
    throw new Error("ID de departamento inválido")
  }

  return db
    .collection("tickets")
    .find({ assigned_department: new ObjectId(departmentId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getTicketsByCreator(userId: string) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(userId)) {
    throw new Error("ID de usuario inválido")
  }

  return db
    .collection("tickets")
    .find({ created_user: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function createTicket(ticketData: Partial<Ticket>) {
  const client = await clientPromise
  const db = client.db()

  const newTicket = {
    ...ticketData,
    status: TicketStatus.ABIERTO,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Convertir strings a ObjectId
  if (typeof newTicket.category === "string" && ObjectId.isValid(newTicket.category)) {
    newTicket.category = new ObjectId(newTicket.category as string)
  }

  if (typeof newTicket.assigned_department === "string" && ObjectId.isValid(newTicket.assigned_department)) {
    newTicket.assigned_department = new ObjectId(newTicket.assigned_department as string)
  }

  if (typeof newTicket.created_user === "string" && ObjectId.isValid(newTicket.created_user)) {
    newTicket.created_user = new ObjectId(newTicket.created_user as string)
  }

  if (Array.isArray(newTicket.assigned_users)) {
    newTicket.assigned_users = newTicket.assigned_users.map((userId) =>
      typeof userId === "string" && ObjectId.isValid(userId) ? new ObjectId(userId) : userId,
    )
  }

  const result = await db.collection("tickets").insertOne(newTicket)
  return { ...newTicket, _id: result.insertedId }
}

export async function updateTicketStatus(id: string, status: number) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de ticket inválido")
  }

  const result = await db.collection("tickets").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  )

  return result.modifiedCount > 0
}

export async function assignTicketToUsers(id: string, userIds: string[]) {
  const client = await clientPromise
  const db = client.db()

  if (!ObjectId.isValid(id)) {
    throw new Error("ID de ticket inválido")
  }

  const objectIdUserIds = userIds.map((userId) => new ObjectId(userId))

  const result = await db.collection("tickets").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        assigned_users: objectIdUserIds,
        updatedAt: new Date(),
      },
    },
  )

  return result.modifiedCount > 0
}

export async function getTicketStats() {
  const client = await clientPromise
  const db = client.db()

  const totalTickets = await db.collection("tickets").countDocuments()
  const openTickets = await db.collection("tickets").countDocuments({ status: TicketStatus.ABIERTO })
  const inProgressTickets = await db.collection("tickets").countDocuments({ status: TicketStatus.PROCESO })
  const waitingTickets = await db.collection("tickets").countDocuments({ status: TicketStatus.ESPERA })
  const reviewTickets = await db.collection("tickets").countDocuments({ status: TicketStatus.REVISION })
  const completedTickets = await db.collection("tickets").countDocuments({ status: TicketStatus.COMPLETADO })
  const canceledTickets = await db.collection("tickets").countDocuments({ status: TicketStatus.CANCELADO })

  // Obtener tickets por categoría
  const ticketsByCategory = await db
    .collection("tickets")
    .aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "categoryInfo" } },
      { $unwind: "$categoryInfo" },
      { $project: { _id: 1, count: 1, name: "$categoryInfo.name" } },
    ])
    .toArray()

  // Obtener tickets por departamento
  const ticketsByDepartment = await db
    .collection("tickets")
    .aggregate([
      { $group: { _id: "$assigned_department", count: { $sum: 1 } } },
      { $lookup: { from: "departments", localField: "_id", foreignField: "_id", as: "departmentInfo" } },
      { $unwind: "$departmentInfo" },
      { $project: { _id: 1, count: 1, name: "$departmentInfo.name" } },
    ])
    .toArray()

  return {
    totalTickets,
    openTickets,
    inProgressTickets,
    waitingTickets,
    reviewTickets,
    completedTickets,
    canceledTickets,
    ticketsByCategory,
    ticketsByDepartment,
  }
}
