// Configuración para la API FastAPI
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
export const API_TIMEOUT = 10000 // 10 segundos

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: "/token",
  REFRESH_TOKEN: "/token",
  LOGOUT: "/token",

  // Usuarios
  USERS: "/usuarios",
  USER: (id: string) => `/usuarios/${id}`,

  // Departamentos
  DEPARTMENTS: "/departments",
  DEPARTMENT: (id: string) => `/departments/${id}`,

  // Categorías
  CATEGORIES: "/categories",
  CATEGORY: (id: string) => `/categories/${id}`,
  CATEGORIES_BY_DEPARTMENT: (departmentId: string) => `/departments/${departmentId}/categories`,

  // Tickets
  TICKETS: "/tickets",
  TICKET: (id: string) => `/tickets/${id}`,
  TICKETS_BY_USER: (userId: string) => `/usuarios/${userId}/tickets`,
  TICKETS_BY_DEPARTMENT: (departmentId: string) => `/departments/${departmentId}/tickets`,

  // Mensajes
  MESSAGES: (ticketId: string) => `/tickets/${ticketId}/messages`,
  MESSAGE: (ticketId: string, messageId: string) => `/tickets/${ticketId}/messages/${messageId}`,

  // Adjuntos
  ATTACHMENTS: (ticketId: string) => `/tickets/${ticketId}/attachments`,
  ATTACHMENT: (ticketId: string, attachmentId: string) => `/tickets/${ticketId}/attachments/${attachmentId}`,

  // Estadísticas
  STATS: "/stats",
  STATS_BY_DEPARTMENT: (departmentId: string) => `/departments/${departmentId}/stats`,
}
