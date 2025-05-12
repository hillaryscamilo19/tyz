import {
  ClipboardDocumentListIcon,
  WrenchIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import styles from "./styles.module.css";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-gray-50 text-xl font-semibold mb-1">Tickets</h1>
      <h1 className="mb-7 font-serif text-gray-400">
        Estadisticas sobre los tickets asignados al usuarios.
      </h1>
      <div className="bg-slate-800 p-4 rounded-md mb-4">
        <div className={styles.PanelTicked}>
          <ClipboardDocumentListIcon className={styles.IconoList} />
          <WrenchIcon className={styles.IconoWrench} />
          <ClockIcon className={styles.IconoClock} />
          <DocumentMagnifyingGlassIcon className={styles.IconoDocument} />
        </div>
        <div className={styles.PanelNombre}>
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
  );
}
