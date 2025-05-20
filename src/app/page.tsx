import { redirect } from "next/navigation"

export default function Home() {
  // Simplemente redirigir a la página de login
  // No necesitamos verificar la sesión aquí
  redirect("/login")
}
