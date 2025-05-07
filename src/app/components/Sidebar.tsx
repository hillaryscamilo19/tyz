import React from "react";
import Image from "next/image";
import Logo from "../public/img/LogTYZ.png";
import {
  HomeIcon,
  PlusIcon,
  BuildingOffice2Icon,
  DocumentDuplicateIcon,
  TicketIcon
} from "@heroicons/react/24/outline";
import TickedFormPage from "./TicketForm";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white flex flex-col p-6">
      <div className="mb-8">
        <Image src={Logo} alt="TYZ Logo" width={150} />
      </div>

      <div className="space-y-6">
        {/* INICIO */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 mb-2">INICIO</h2>
          <a
            href="/"
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-700"
          >
            <HomeIcon className="w-5 h-5 text-gray-300" />
            <span>Inicio</span>
          </a>
        </div>

        {/* TICKETS */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 mb-2">TICKETS</h2>
          <a
            href="/crear-ticket"
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-700"
          >
            <PlusIcon className="w-5 h-5 text-gray-300" />
            <span>Crear nuevo ticket</span>
          </a>
        </div>

        {/* ASIGNADOS */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 mb-2">
            ASIGNADOS
          </h2>
          <a
            href="/mis-tickets"
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-700"
          >
            <TicketIcon className="w-5 h-5 text-gray-300" />
            <span>Mis tickets asignados</span>
          </a>
          <a
            href="/departamento"
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-700"
          >
            <BuildingOffice2Icon className="w-5 h-5 text-gray-300" />
            <span>Asignados al departamento</span>
          </a>
        </div>

        {/* CREADOS */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 mb-2">CREADOS</h2>
          <a
            href="/nuestros-creados"
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-700"
          >
            <DocumentDuplicateIcon className="w-5 h-5 text-gray-300" />
            <span>Nuestros creados</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
