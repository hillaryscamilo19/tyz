"use client"

import type React from "react"


import Sidebar from "@/components/Sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  // Si no está autenticado, no mostrar el layout del dashboard
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 h-screen flex-shrink-0">
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Área de contenido principal con scroll */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

