import { API_BASE_URL, API_TIMEOUT } from "./api-config"

// Tipos de respuesta de la API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Opciones para las peticiones
interface RequestOptions {
  headers?: Record<string, string>
  timeout?: number
}

// Cliente HTTP para interactuar con la API
class ApiClient {
  private baseUrl: string
  private defaultTimeout: number

  constructor(baseUrl: string, defaultTimeout: number = API_TIMEOUT) {
    this.baseUrl = baseUrl
    this.defaultTimeout = defaultTimeout
  }

  // Método para obtener los headers de autenticación
  private async getAuthHeaders(): Promise<Record<string, string>> {
    // Obtener el token de acceso del almacenamiento local o de las cookies
    const token = localStorage.getItem("accessToken")

    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Método para manejar errores de la API
  private handleApiError(response: Response): never {
    throw new Error(`Error en la API: ${response.status} ${response.statusText}`)
  }

  // Método para manejar el timeout de las peticiones
  private createTimeoutPromise(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`La petición ha excedido el tiempo límite de ${ms}ms`))
      }, ms)
    })
  }

  // Método GET
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const authHeaders = await this.getAuthHeaders()
    const headers = { ...authHeaders, ...options.headers }
    const timeout = options.timeout || this.defaultTimeout

    try {
      const responsePromise = fetch(url, {
        method: "GET",
        headers,
        credentials: "include", // Para enviar cookies
      })

      // Crear una promesa que se rechaza después del timeout
      const timeoutPromise = this.createTimeoutPromise(timeout)

      // Esperar a la primera promesa que se resuelva o rechace
      const response = await Promise.race([responsePromise, timeoutPromise])

      if (!response.ok) {
        return this.handleApiError(response)
      }

      return await response.json()
    } catch (error) {
      console.error("Error en la petición GET:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  // Método POST
  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const authHeaders = await this.getAuthHeaders()
    const headers = {
      "Content-Type": "application/json",
      ...authHeaders,
      ...options.headers,
    }
    const timeout = options.timeout || this.defaultTimeout

    try {
      const responsePromise = fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
        credentials: "include", // Para enviar cookies
      })

      // Crear una promesa que se rechaza después del timeout
      const timeoutPromise = this.createTimeoutPromise(timeout)

      // Esperar a la primera promesa que se resuelva o rechace
      const response = await Promise.race([responsePromise, timeoutPromise])

      if (!response.ok) {
        return this.handleApiError(response)
      }

      return await response.json()
    } catch (error) {
      console.error("Error en la petición POST:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  // Método PUT
  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const authHeaders = await this.getAuthHeaders()
    const headers = {
      "Content-Type": "application/json",
      ...authHeaders,
      ...options.headers,
    }
    const timeout = options.timeout || this.defaultTimeout

    try {
      const responsePromise = fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
        credentials: "include", // Para enviar cookies
      })

      // Crear una promesa que se rechaza después del timeout
      const timeoutPromise = this.createTimeoutPromise(timeout)

      // Esperar a la primera promesa que se resuelva o rechace
      const response = await Promise.race([responsePromise, timeoutPromise])

      if (!response.ok) {
        return this.handleApiError(response)
      }

      return await response.json()
    } catch (error) {
      console.error("Error en la petición PUT:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  // Método DELETE
  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const authHeaders = await this.getAuthHeaders()
    const headers = { ...authHeaders, ...options.headers }
    const timeout = options.timeout || this.defaultTimeout

    try {
      const responsePromise = fetch(url, {
        method: "DELETE",
        headers,
        credentials: "include", // Para enviar cookies
      })

      // Crear una promesa que se rechaza después del timeout
      const timeoutPromise = this.createTimeoutPromise(timeout)

      // Esperar a la primera promesa que se resuelva o rechace
      const response = await Promise.race([responsePromise, timeoutPromise])

      if (!response.ok) {
        return this.handleApiError(response)
      }

      return await response.json()
    } catch (error) {
      console.error("Error en la petición DELETE:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  // Método para subir archivos
  async uploadFile<T>(endpoint: string, file: File, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const authHeaders = await this.getAuthHeaders()
    const formData = new FormData()
    formData.append("file", file)
    const timeout = options.timeout || this.defaultTimeout

    try {
      const responsePromise = fetch(url, {
        method: "POST",
        headers: { ...authHeaders },
        body: formData,
        credentials: "include", // Para enviar cookies
      })

      // Crear una promesa que se rechaza después del timeout
      const timeoutPromise = this.createTimeoutPromise(timeout)

      // Esperar a la primera promesa que se resuelva o rechace
      const response = await Promise.race([responsePromise, timeoutPromise])

      if (!response.ok) {
        return this.handleApiError(response)
      }

      return await response.json()
    } catch (error) {
      console.error("Error en la subida de archivos:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }
}

// Exportar una instancia del cliente
export const apiClient = new ApiClient(API_BASE_URL)
