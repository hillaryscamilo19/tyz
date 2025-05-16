import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  fullname: string
  email: string
  phone_ext?: number
  department: ObjectId
  role: number
  username: string
  password: string
  status: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Department {
  _id?: ObjectId
  name: string
}

export interface Category {
  _id?: ObjectId
  name: string
  list_departments: ObjectId[]
}

export interface Message {
  _id?: ObjectId
  message: string
  createdById: ObjectId
  createdAt?: Date
  updatedAt?: Date
}

export interface Attachment {
  _id?: ObjectId
  file_name: string
  file_path: string
  file_extension: string
  ticket_id: ObjectId
}

export interface Ticket {
  _id?: ObjectId
  title: string
  description: string
  category: ObjectId
  assigned_department: ObjectId
  assigned_users: ObjectId[]
  created_user: ObjectId
  messages: ObjectId[]
  status: number
  createdAt?: Date
  updatedAt?: Date
}

export const TicketStatus = {
  CANCELADO: 0,
  ABIERTO: 1,
  PROCESO: 2,
  ESPERA: 3,
  REVISION: 4,
  COMPLETADO: 5,
}

export const UserRoles = {
  ADMIN: 1,
  USUARIO: 2,
  SUPERVISOR: 3,
}
