import { TicketIcon } from "@heroicons/react/24/outline"

export default function MisTickets() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Mis Tickets Asignados</h1>
        <p className="text-gray-400">Tickets que te han sido asignados para resolver.</p>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Lista de tickets</h2>
            <div className="flex items-center space-x-2">
              <select className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm">
                <option>Todos los estados</option>
                <option>Abierto</option>
                <option>En progreso</option>
                <option>En espera</option>
                <option>Resuelto</option>
              </select>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                Filtrar
              </button>
            </div>
          </div>

          {/* Lista de tickets */}
          <div className="bton bg-slate-700 rounded-lg p-8 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-center">No tienes tickets asignados actualmente.</p>
            <p className="text-gray-500 text-sm text-center mt-2">Los tickets que te sean asignados aparecerán aquí.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
