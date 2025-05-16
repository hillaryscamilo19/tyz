import {
  ClipboardDocumentListIcon,
  WrenchIcon,
  EnvelopeIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon
  ,

} from "@heroicons/react/24/outline";

import styles from './styles.module.css'

export default function HomePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Tickets</h1>
      <h1 className="mb-7 font-serif text-gray-400">Estadisticas sobre los tickets asignados al usuarios.</h1>
      <div className="bg-slate-800 p-4 rounded-md mb-4">
        <div className={styles.PanelTicked}>
           <ClipboardDocumentListIcon className={styles.IconoList} />
           <WrenchIcon className={styles.IconoWrench}/>
           <ClockIcon className={styles.IconoClock}/>
           <DocumentMagnifyingGlassIcon className={styles.IconoDocument}/>
        </div>
        <div className={styles.PanelNombre}>
            <span>Asignados</span>
            <span>Procesos</span>
            <span>Espera</span>
            <span>Revicion</span>  
        </div> 
      </div>
    </div>
  );
}