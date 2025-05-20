import credentials from "next-auth/providers/credentials";
import { apiClient } from "./api-client";
import { API_ENDPOINTS } from "./api-config";

// Tipos para la autenticación
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    email: string;
    role: string;
    department: string;
    status: boolean;
  };
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Servicio de autenticación
export const authService = {
  // Iniciar sesión
  login: async ({ username, password }: LoginCredentials) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: new URLSearchParams({
          username: credentials?.username ?? "",
          password: credentials?.password ?? "",
        }),
      });

      if (!response.ok) throw new Error("Credenciales inválidas");

      return response.json();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  },

  // Cerrar sesión
  async logout(): Promise<boolean> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGOUT, {});

      // Eliminar los tokens del almacenamiento local
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return response.success;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      // Eliminar los tokens del almacenamiento local de todas formas
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return false;
    }
  },

  // Refrescar el token de acceso
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return null;
      }

      const response = await apiClient.post<RefreshTokenResponse>(
        API_ENDPOINTS.REFRESH_TOKEN,
        {
          refresh_token: refreshToken,
        }
      );

      if (response.success && response.data) {
        // Guardar el nuevo token de acceso en el almacenamiento local
        localStorage.setItem("accessToken", response.data.access_token);

        return response.data.access_token;
      }

      return null;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      return null;
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  },

  // Obtener el token de acceso
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },
};
