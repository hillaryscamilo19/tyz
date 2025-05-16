"use client";
import { useEffect, useState } from "react";
import "../asignacion/style.css";
import { TicketIcon } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CrearNuevoTicket() {
  type Departamento = {
  _id: string;
  name: string;
};

const [departamentoList, setDepartamentoList] = useState<Departamento[]>([]);
  const [asunto, setAsunto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [departamentos, setDepartamentos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);


  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/departments/");
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

  useEffect(() => {
    const fetchcategoria = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDepartamentoList(data);
      } catch (error) {
        console.error("Error al cargar Categoria:", error);
      }
    };

    fetchcategoria();
  }, []);

  return (
    <div className="p-6 -100 min-h-screen">
      <div className="mb-6">
        <h1 className="fs-5 text text-white font-bold">Crear nuevo Ticket</h1>
      </div>

      <div className=" p-6 rounded shadow-md main">
        <p className="text-sm  text-black">
          Formulario de creación de ticket
        </p>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Asunto</label>
          <input
            type="text"
            placeholder="Escriba el asunto de su ticket"
            className="w-full border text-black border-gray-300 rounded px-4 py-2"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium text-black">Departamento</label>
            <div className="relative">
              <select
                name="departments"
                className="text-dark-emphasis w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-50"
                value={departamentos}
                onChange={(e) => setDepartamentos(e.target.value)}
              >
                <option value="">---Seleccione un departamento</option>
                {departamentoList && departamentoList.length > 0 ? (
                  departamentoList.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
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
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">Categoria</label>
            <div className="relative">
              <select
                name="departments"
                className="text-dark-emphasis w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-50"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">---Seleccione una Categoria</option>
                {departamentoList && departamentoList.length > 0 ? (
                  departamentoList.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {departamentoList
                      ? "No hay Categoria disponibles"
                      : "Cargando Categoria..."}
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Descripción</label>
          <textarea
            rows={5}
            placeholder="Describa su solicitud"
            className="w-full border border-gray-300 rounded px-4 py-2 text-black"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group mb-3">
          <input 
          type="file" 
          className="form-control text-black" 
          id="inputGroupFile01" 
          onChange={(e) => setArchivo(e.target.files?.[0] || null)}/>
        </div>

        <button className=" backgraou text-white px-6 py-2 rounded hover:bg-green-700 transition w-100">
          Enviar Tickets
        </button>
      </div>
    </div>
  );
}
