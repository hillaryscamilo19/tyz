"use client"
import { ClipboardDocumentListIcon, ClockIcon, DocumentMagnifyingGlassIcon, WrenchIcon } from "@heroicons/react/24/outline"
import '../app/dashboard/styles.css'

export function DashboardStats() {
  return (
    <div className="container">
      <h1 className="text-gray-50 text-xl font-semibold mb-1">Tickets</h1>
      <h1 className="mb-7 font-serif text-gray-400">
        Estadisticas sobre los tickets asignados al usuarios.
      </h1>
      <div className="bg-slate-800 p-4 rounded-md mb-4">
        <div className="PanelTicke">
          <ClipboardDocumentListIcon className="IconoList" />
          <WrenchIcon className="IconoWrench" />
          <ClockIcon className="IconoClock" />
          <DocumentMagnifyingGlassIcon className= "IconoDocument" />
        </div>
        <div className="PanelNombre">
          <span className="text-gray-50">Asignados:
            70
          </span>
          <span className="text-gray-50"> Procesos:
            10
          </span>
          <span className="text-gray-50">Espera:
            10
          </span>
          <span className="text-gray-50">Revicion:
            10
          </span>
        </div>
      </div>
    </div>
  )
}
