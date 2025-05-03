// src/app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Aquí podrías validar usuario, luego redirigir
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2>Inicio de sesión</h2>
        <h2 className="text-xl font-semibold mb-4">Iniciar sesión en TYZ</h2>
        <span>Usuario</span>
        <input
          type="text"
          placeholder="Escriba su nombre del usuario"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
         <span>Contraseña</span>
         <input
          type="text"
          placeholder="Escriba su contraseña"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Entrar
        </button>

        <span>¿No tienes una cuenta? Registrarse</span>
      </div>
    </div>
  );

}
