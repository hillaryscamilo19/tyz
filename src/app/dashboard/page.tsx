"use client"

import {
  ClipboardDocumentListIcon,
  WrenchIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import Logo from "../../../public/img/FondoPrin.png"
import Image from "next/image"
import "./styles.css"
import { useApi } from "@/hooks/use-api"
import { API_ENDPOINTS } from "@/lib/api/api-config"
import { apiClient } from "@/lib/api/api-client"

interface TicketStats {
  total: number
  byStatus: {
    "0": number // Nuevo
    "1": number // En Progreso
    "2": number // En Espera
    "5": number // Cerrado
  }
}

interface DashboardStatsProps {
  stats?: TicketStats
}

export default function Dashboard({ stats: initialStats }: DashboardStatsProps) {
  const [stats, setStats] = useState<TicketStats>(
    initialStats || {
      total: 0,
      byStatus: {
        "0": 0,
        "1": 0,
        "2": 0,
        "5": 0,
      },
    },
  )

  // Usar el hook personalizado para obtener las estadísticas
  const {
    isLoading,
    error,
    execute: fetchStats,
  } = useApi(
    async () => {
      const response = await apiClient.get<TicketStats>(API_ENDPOINTS.STATS)
      return response.data || stats
    },
    {
      onSuccess: (data) => {
        if (data) {
          setStats(data)
        }
      },
      onError: (error) => {
        console.error("Error al obtener estadísticas:", error)
      },
    },
  )

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="container">
      <h1 className="text-gray-900 text-xl font-semibold mb-1">Tickets</h1>
      <h1 className="mb-7 font-serif text-gray-400">Estadisticas sobre los tickets asignados al usuarios.</h1>
      <div className="container-arriba p-4 rounded-md mb-4">
        <div className="PanelTicked">
          <ClipboardDocumentListIcon className="IconoList" />
          <WrenchIcon className="IconoWrench" />
          <ClockIcon className="IconoClock" />
          <DocumentMagnifyingGlassIcon className="IconoDocument" />
        </div>
        <div className="PanelNombre">
          <span className="bg-stone-50">
            Asignados:
            <p className="text-3xl font-bold">{isLoading ? "..." : stats.total}</p>
          </span>
          <span className="bg-stone-50">
            {" "}
            Procesos:
            <p className="text-3xl font-bold">{isLoading ? "..." : stats.byStatus["0"] || 0}</p>
          </span>
          <span className="bg-stone-50">
            Espera:
            <p className="text-3xl font-bold">{isLoading ? "..." : stats.byStatus["1"] || 0}</p>
          </span>
          <span className="bg-stone-50">
            Revicion:
            <p className="text-3xl font-bold">{isLoading ? "..." : stats.byStatus["5"] || 0}</p>
          </span>
        </div>
      </div>

      <div className="container-abajo bg-stone-50 ">
        <div className="img">
          <Image className="" src={Logo || "/placeholder.svg"} alt="Logo" width={560} height={100} />
        </div>
      </div>
    </div>
  )
}
