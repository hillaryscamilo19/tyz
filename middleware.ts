import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta debe estar protegida
  const isProtectedRoute = pathname.startsWith("/dashboard")
  const isAuthRoute = pathname === "/login"

  // Obtener el token de la sesión
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirigir a login si la ruta está protegida y no hay token
  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Redirigir a dashboard si el usuario ya está autenticado y está intentando acceder a login
if (isAuthRoute && token && !request.nextUrl.searchParams.has("callbackUrl")) {
  return NextResponse.redirect(new URL("/dashboard", request.url))
}

  return NextResponse.next()
}

// Configurar las rutas que deben ser procesadas por el middleware
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
