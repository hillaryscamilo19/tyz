import TicketList from "@/app/components/TicketList";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Mis Asignados</h1>
      <div className="bg-slate-800 p-4 rounded-md">
        <TicketList />
      </div>
    </div>
  );
}
