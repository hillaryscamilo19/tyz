"use client";

import { useState } from "react";
import { Moon, Sun, LogOut, User , CircleUserRoundIcon } from "lucide-react";
import {
UserCircleIcon

} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Aquí puedes activar el cambio real de tema si tienes lógica
  };

  return (
    <nav className="w-full bg-slate-800 text-white p-4 flex items-center justify-end relative shadow-md">
      <div className="flex items-center gap-4">
        {/* Modo oscuro/claro */}
        <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={toggleTheme}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-500"></div>
  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></span>
</label>

          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
        </div>

        {/* Ícono de perfil */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 p-2 hover:bg-slate-700 rounded-md"
          >
            <CircleUserRoundIcon size={40} />
            <span className="text-sm">▼</span>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-slate-700 rounded-md shadow-md z-10">
              <button
                onClick={() => {
                  // lógica para cerrar sesión
                  console.log("Cerrar sesión");
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-600"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
