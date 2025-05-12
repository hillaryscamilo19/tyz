"use client";

import { TicketIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function MisTicketsAsignado() {
  const [asunto, setAsunto] = useState("");
 const [categoria, setcategoria] = useState([]);
  const [departamentos, setDepartamentos] = useState("");
  const [decripcion, setdescripcions] = useState("");

//PAra categoria
 useEffect(() =>{
    const fetchCategoria = async () => {
        try{
            const response = await fetch("http://localhost:8000/departments/");
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setcategoria(data);
        }catch(error){
            console.log("Error al cargar departamentos:", error);
        }
    };
    fetchCategoria();
 }, []);




    // Estado para departamentos
    const [departamentoList, setDepartamentoList] = useState([]);
  
    useEffect(() => {
      const fetchDepartamentos = async () => {
        try {
          const response = await fetch("http://localhost:8000/departments/");
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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-50"> Crear Nuevo Ticked</h1>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl  text-gray-50">
              Formulario de creacion de Ticked
            </h2>
            <div className="flex items-center space-x-2"></div>
          </div>

          {/* Lista de tickets */}
          <div className="bg-slate-700 rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba el asunto de su ticket"
                className="w-full border border-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-50"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              />
            </div>
            <div className="relative">
                  <select
                name="departments"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={departamentos}
                onChange={(e) => setDepartamentos(e.target.value)}
              >
                <option value="">Seleccione un departamento</option>
                {departamentoList && departamentoList.length > 0 ? (
                  departamentoList.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.nombre}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {departamentoList
                      ? "No hay departamentos disponibles"
                      : "Cargando departamentos..."}
                  </option>
                )}
              </select>
            </div>
            <div className="relative">
               <select
                name="departments"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={departamentos}
                onChange={(e) => setDepartamentos(e.target.value)}
              >
                <option value="">Seleccione un departamento</option>
                {departamentoList && departamentoList.length > 0 ? (
                  departamentoList.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.nombre}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {departamentoList
                      ? "No hay departamentos disponibles"
                      : "Cargando departamentos..."}
                  </option>
                )}
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba el asunto de su ticket"
                className="w-full border border-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-50"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
