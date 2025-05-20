import { User } from "../models/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      console.error("Fallo al autenticar usuario:", await response.text())
      return null
    }

    const user = await response.json()
    return user as User
  } catch (error) {
    console.error("Error al autenticar usuario:", error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`)

    if (!response.ok) {
      console.error("Fallo al obtener usuario por ID:", await response.text())
      return null
    }

    const user = await response.json()
    return user as User
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error)
    return null
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`)

    if (!response.ok) {
      console.error("Fallo al obtener usuarios:", await response.text())
      return []
    }

    const users = await response.json()
    return users as User[]
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error)
    return []
  }
}

export async function createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Fallo al crear usuario:", errorText)
      throw new Error(errorText)
    }

    const createdUser = await response.json()
    return createdUser as User
  } catch (error) {
    console.error("Error al crear usuario:", error)
    throw error
  }
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Fallo al actualizar usuario:", errorText)
      return null
    }

    const updatedUser = await response.json()
    return updatedUser as User
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    return null
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      console.error("Fallo al eliminar usuario:", await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    return false
  }
}
