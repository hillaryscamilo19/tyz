"use client";
import { useEffect, useState } from "react";
import "../asignacion/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TicketIcon } from "lucide-react";

export default function CrearNuevoTicket() {
  const [asunto, setAsunto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);

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
    <div className="p-6 -100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Crear nuevo Ticket</h1>
        <p className="text-sm text-gray-600">Formulario de creación de ticket</p>
      </div>

      <div className=" p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Asunto</label>
          <input
            type="text"
            placeholder="Escriba el asunto de su ticket"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Departamento</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            >
              <option value="">Seleccione un departamento</option>
              {departamentoList.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Categoría</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              {/* Puedes cargar desde otra API si es distinta */}
              {departamentoList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea
            rows={5}
            placeholder="Describa su solicitud"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group mb-4">
          <label className="input-group-text" for="inputGroupFile01">Examinar...</label>
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
          />
        </div>

        <button
        
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
               <TicketIcon className="w-5 h-5 text-gray-300" />
          Enviar Tickets
        </button>
      </div>
    </div>
  );
}
