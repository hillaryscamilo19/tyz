"use client";
import { useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [departamentos, setDepartamentos] = useState("");
  const [extensión, setExtensión] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const router = useRouter();

  /**Services */

  const handleRegister = async () => {
    try {
      setError("");

      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("departamentos", departamentos);
      formData.append("extensión", extensión);
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_Usuario: username,
          nombre: name,
          email: email,
          extensión: extensión,
          departamento_id: departamentos,
          role: "usuario",
          password: password,
        }),
      });

      if (response.ok) {
        router.push("/auth/login");
      } else {
        const error = await response.json();
        console.error("Registro fallido:", error);
      }
    } catch (err) {
      console.error("Error al registrarse:", err);
    }
  };

  // Estado para departamentos
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
    <div className="flex h-screen w-full">
      {/* Columna Izquierda */}
      <div className="w-1/2 bg-white flex flex-col justify-center mb-6 py-2 items-center p-10">
    
        <p className="text-center text-gray-600 mb-6 max-w-sm">
          Aplicación de tickets interna para las solicitudes realizadas entre
          departamentos.
        </p>
 
 
      </div>

      {/* Columna Derecha */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
          <h2 className="mb-1.5 block font-medium">Crear cuenta</h2>
          <h1 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Registrarse en TYZ
          </h1>

          {/* Input Usuario */}
          <div className="mb-4 relative">
            <span className="block mb-1 text-gray-600">Nombre</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba su nombre de usuario"
                className="text-dark-emphasis w-full rounded-lg border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <UserIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Input Usuario */}
          <div className="mb-4 relative">
            <span className="block mb-1 text-gray-600">Email</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba su nombre de usuario"
                className="text-dark-emphasis w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EnvelopeIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
            <span className="block mb-1 font-medium text-gray-600">Departamento</span>
            <div className="relative">
              <select
                name="departments"
                className="text-dark-emphasis w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-50"
                value={departamentos}
                onChange={(e) => setDepartamentos(e.target.value)}
              >
                <option value="">Seleccione un departamento</option>
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
              <BuildingOffice2Icon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
            </div>
            <div>
            <span className="block mb-1 font-medium text-gray-600">
              Número de extensión
            </span>
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba su Extension"
                className="text-dark-emphasis w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-50"
                value={extensión}
                onChange={(e) => setExtensión(e.target.value)}
              />
              <PhoneIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          </div>

          <div className="mb-4 relative">
            <span className="block mb-1 text-gray-600">Nombre de usuario</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba su nombre de usuario"
                className="text-dark-emphasis w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <UserIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="mb-4 relative">
            <span className="block mb-1 text-gray-600">Contraseña</span>
            <div className="relative">
              <input
                type="password"
                placeholder="Escriba su Contraseña"
                className="text-dark-emphasis w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <KeyIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Botón Entrar */}
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
          >
            Registrarse
          </button>

          {/*Registro */}
             <p className="text-center text-sm text-gray-600 mt-4">
             ¿Ya tienes una cuenta?{" "}
            <a href="/auth/login" className="text-green-600 hover:underline">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
