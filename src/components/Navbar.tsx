"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, LogOut, CircleUserRoundIcon } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [departamento, setDepartamento] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    router.push("/auth/login");
  };

  type Usuario = {
  _id: string;
  fullname?: string;
  role?: string;
  departamento_id?: string;
};


const [usuario, setUsuario] = useState<Usuario | null>(null);
  // Obtener información del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Obtener el token del localStorage
        const token = localStorage.getItem("token");
        
        if (!token) {
          // Si no hay token, redirigir al login
          router.push("/login");
          return;
        }
        
        // Hacer la solicitud con el token en el encabezado
        const response = await fetch("http://localhost:8000/api/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Datos del usuario:", data);
        setUsuario(data);
        
        // Si tenemos el ID del departamento, obtener su información
        if (data.departamento_id) {
          useEffect(data.departamento_id);
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [router]);

  // Función para obtener el nombre del departamento por su ID
    const [departamentoList, setDepartamentoList] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
      const response = await fetch('http://localhost:8000/api/departments');

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDepartamentoList(data);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    };

    fetchDepartamentos();
  }, []);


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
            className="flex items-center gap-2 p-2 hover:bg-slate-700 rounded-md"
          >
            <div className="flex flex-col items-end mr-2">
              <span className="font-medium">
                {loading ? "Cargando..." : usuario?._id || "Usuario"}
              </span>
              <span className="text-xs text-gray-300">
                {loading ? "" : departamento || "Cargando departamento..."}
              </span>
            </div>
            <CircleUserRoundIcon size={40} />
            <span className="text-sm">▼</span>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-slate-700 rounded-md shadow-md z-10">
              {usuario?.role === "Administrador" && (
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-600"
                >
                  Administrador
                </button>
              )}
              <button
                onClick={handleLogout}
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