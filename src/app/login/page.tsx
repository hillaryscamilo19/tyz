// src/app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Logo from "../public/img/tyz.png";
import Ilustracion from "../public/img/logo2.png";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen w-full">
      {/* Columna Izquierda */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <Image src={Logo} alt="Logo TYZ" className="mb-4" />
        <p className="text-center text-gray-600 mb-8 max-w-sm">
          Aplicación de tickets interna para las solicitudes realizadas entre
          departamentos.
        </p>
        <Image
          src={Ilustracion}
          alt="Ilustración TYZ"
          className="w-100 h-auto"
        />
      </div>

      {/* Columna Derecha */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-sm text-gray-500">Inicio de sesión</h2>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Iniciar sesión en TYZ
          </h1>

          {/* Input Usuario */}
          <div className="mb-4 relative">
            <span className="block mb-1 text-gray-600">Usuario</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba su nombre de usuario"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <UserIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="mb-6 relative">
            <span className="block mb-1 text-gray-600">Contraseña</span>
            <div className="relative">
              <input
                type="password"
                placeholder="Escriba su contraseña"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Botón Entrar */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
          >
            Entrar
          </button>

          {/* Registro */}
          <p className="text-center text-sm text-gray-600 mt-4">
            ¿No tienes una cuenta?{""}
            <a href="/registro" className="text-green-600 hover:underline">
              Registrarse
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
