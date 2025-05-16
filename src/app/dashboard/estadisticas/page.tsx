"use client"

import { DashboardStats } from "@/components/dashboard-stats"

export default function EstadisticasPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Estadísticas del sistema</h1>
      <DashboardStats />
    </div>
  )
}
