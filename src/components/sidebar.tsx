"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Plus,
  Inbox,
  Building2,
  FileText,
  BarChart3,
  Settings,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { UserRoles } from "@/lib/models/types";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isAdmin = session?.user?.role === UserRoles.ADMIN;

  return (
    <div className="w-[150px] bg-[#333] text-white flex flex-col h-full">
      <div className="p-4 bg-[#4CAF50] flex items-center justify-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-white">TY2</h1>
        </Link>
      </div>
      <div className="p-4 text-xs uppercase text-gray-400">Ticket</div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                isActive("/dashboard") && !isActive("/dashboard/crear-ticket")
                  ? "bg-[#444]"
                  : ""
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/crear-ticket"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                isActive("/dashboard/crear-ticket") ? "bg-[#444]" : ""
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Crear nuevo ticket</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 text-xs uppercase text-gray-400">Asignados</div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          <li>
            <Link
              href="/dashboard/ticked"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                isActive("/dashboard/ticked") ? "bg-[#444]" : ""
              }`}
            >
              <Inbox className="h-4 w-4" />
              <span>Mis tickets asignados</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/departamento"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                isActive("/dashboard/departamento") ? "bg-[#444]" : ""
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Asignados al departamento</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 text-xs uppercase text-gray-400">Creados</div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          <li>
            <Link
              href="/dashboard/nuestros-creados"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                isActive("/dashboard/nuestros-creados") ? "bg-[#444]" : ""
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Nuestros creados</span>
            </Link>
          </li>
        </ul>
      </nav>
      {isAdmin && (
        <>
          <div className="p-4 text-xs uppercase text-gray-400">
            Administración
          </div>
          <nav className="flex-1">
            <ul className="space-y-1 px-2">
              <li>
                <Link
                  href="/dashboard/estadisticas"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                    isActive("/dashboard/estadisticas") ? "bg-[#444]" : ""
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Estadísticas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/usuarios"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                    isActive("/dashboard/usuarios") ? "bg-[#444]" : ""
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/configuracion"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-[#444] ${
                    isActive("/dashboard/configuracion") ? "bg-[#444]" : ""
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
