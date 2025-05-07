// src/app/dashboard/page.tsx
export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-xl font-semibold mb-4">Mis Asignados</h1>
        <div className="bg-slate-800 p-4 rounded-md">
          <p>Listado de tickets asignados al usuario.</p>
          {/* Aquí puedes renderizar componentes como filtros, tabs, lista de tickets */}
        </div>
      </div>
    );
  }
  