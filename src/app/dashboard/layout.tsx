import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import HomePage from "../home/page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 bg-slate-900 text-white p-6 overflow-y-auto">
                 <HomePage></HomePage>
          {children}
        </main>
      </div>
    </div>
  );
}
