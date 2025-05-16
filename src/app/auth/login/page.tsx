"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserIcon, LockClosedIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

interface User {
  _id: string;
  fullname: string;
  email: string;
  phone_ext: number;
  username: string;
  department: string;
  role: number;
  status: boolean;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");

      // Crear un objeto URLSearchParams para enviar datos en formato form-urlencoded
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token); 
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error de login:", errorData);
        setError(
          errorData.detail ||
            "Error al iniciar sesión. Verifica tus credenciales."
        );
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error de conexión. Intenta de nuevo más tarde.");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Columna Izquierda */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
     
        <p className="text-center text-gray-600 mb-8 max-w-sm">
          Aplicación de tickets interna para las solicitudes realizadas entre
          departamentos.
        </p>
         
        <label className="text-2xl fs-6 text  text-dark-emphasis mb-1">Hecho con Amor By: Hillarys💕</label>
      </div>

      {/* Columna Derecha */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-stone p-8 rounded shadow">
          <h2 className="text-dark-emphasis fs-6 text">Inicio de sesión</h2>
          <h1 className="text-2xl fs-2 text font-bold text-dark-emphasis mb-6">
            Iniciar sesión en TYZ
          </h1>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Input Usuario */}
          <div className="mb-4 relative">
            <span className="block mb-1 text-gray-600">Usuario</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba su nombre de usuario o email"
                className="w-full border text-dark-emphasis border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 text-dark-emphasis "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <UserIcon className="w-5 h-5 text-dark-emphasis absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="mb-6 relative">
            <span className="block mb-1 text-gray-600">Contraseña</span>
            <div className="relative">
              <input
                type="password"
                placeholder="Escriba su contraseña"
                className="w-full border text-dark-emphasis  border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-2.5 text-dark-emphasis " />
            </div>
          </div>

          {/* Botón Entrar */}
          <button
            onClick={handleLogin}
            className="backgraou w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
          >
            <ArrowRightStartOnRectangleIcon className="w-5 h-5 absolute left-316 text-white text-dark-emphasis "/>
            Entrar
          </button>

          {/* Registro */}
          <p className="text-center text-sm text-gray-600 mt-4">
            ¿No tienes una cuenta?{" "}
            <a href="/auth/registro" className="text-green-600 hover:underline">
              Registrarse
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
