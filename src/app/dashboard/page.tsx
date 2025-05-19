import {
  ClipboardDocumentListIcon,
  WrenchIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Logo from "../../../public/img/FondoPrin.png"
import Image from "next/image";
import "./styles.css";

export default function HomePage() {
  return (
    <div className="container">
      <h1 className="text-gray-900 text-xl font-semibold mb-1">Tickets</h1>
      <h1 className="mb-7 font-serif text-gray-400">
        Estadisticas sobre los tickets asignados al usuarios.
      </h1>
      <div className="container-arriba p-4 rounded-md mb-4">
        <div className="PanelTicked">
          <ClipboardDocumentListIcon className="IconoList" />
          <WrenchIcon className="IconoWrench" />
          <ClockIcon className="IconoClock" />
          <DocumentMagnifyingGlassIcon className= "IconoDocument" />
        </div>
        <div className="PanelNombre">
          <span className="bg-stone-50">Asignados:
            70
          </span>
          <span className="bg-stone-50"> Procesos:
            10
          </span>
          <span className="bg-stone-50">Espera:
            10
          </span>
          <span className="bg-stone-50">Revicion:
            10
          </span>
        </div>
      </div>

      <div className="container-abajo bg-stone-50 ">
        <div className="img">
            <Image
              className=""
              src={Logo}
              alt="Logo"
              width={560}
              height={100}
            />
        </div>
      </div>
    </div>
  );
}
