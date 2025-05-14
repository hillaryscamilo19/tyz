import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "@/app/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sistema de Tickets TYZ",
  description: "Sistema interno de gestión de tickets",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        <div className="min-h-screen flex flex-col">
          {/* Contenido principal */}
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
