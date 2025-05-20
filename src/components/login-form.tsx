"use client";

import type React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import "../app/style.css";
import tyz from "../../public/img/tyz.png";
import logo from "../../public/img/logo2.png";
import "../app/style.css";
import { authService } from "@/lib/api/auth-service";
import router from "next/router";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const formData = new URLSearchParams();

  // Obtener error de los parámetros de búsqueda
  const errorParam = searchParams.get("error");
  const [errorMessage, setErrorMessage] = useState<string>(
    errorParam === "CredentialsSignin"
      ? "Credenciales inválidas. Por favor, inténtalo de nuevo."
      : ""
  );

  // Usar el hook personalizado para la autenticación
  const { isLoading, execute: login } = useApi(
    async () => {
      return await authService.login({ username, password });
    },
    {
      onSuccess: async (data) => {
        // En lugar de usar authService.login() y luego signIn, solo usa signIn:

        const result = await signIn("credentials", {
          redirect: false,
          username,
          password,
          callbackUrl: "/dashboard",
        });

        if (result?.error) {
          console.error("Error de inicio de sesión:", result.error);
          setErrorMessage(
            "Error al iniciar sesión. Por favor, inténtalo de nuevo."
          );
          return;
        }

        if (result?.ok) {
          console.log("Inicio de sesión exitoso, redirigiendo...");
          setIsRedirecting(true);
          router.push("/dashboard");
        }
      },
    }
  );

  const handleSubmit = async () => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    console.log(result);
    // maneja resultado...
  };

  return (
    <div className="login-container">
      <div className="login-card row">
        {/* Columna Izquierda */}
        <div className="col-md-6 login-left d-none d-md-flex flex-column align-items-center justify-content-center text-center">
          <div className="py-10 px-26 text-center img">
            <Image src={tyz} alt="Logo" width={200} height={100} />
            <p className="text-center text-gray-600 mb-8 max-w-sm ">
              Aplicación de tickets interna para las solicitudes realizadas
              entre departamentos.
            </p>
            <Image
              className="img-fluid mb-3"
              src={logo}
              alt="Logo"
              width={250}
              height={100}
            />
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="col-md-6 login-right p-5">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-1.5 block font-medium">Inicio de sesión</h2>
            <h1 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Iniciar sesión en TYZ
            </h1>

            {/* Mensaje de error */}
            {errorMessage && (
              <div className="error mb-4 text-center p-3 bg-red-100 text-red-700 rounded-lg ">
                <div>
                  <AlertCircle />
                  <AlertTitle className="titleError">Error</AlertTitle>
                </div>
                {errorMessage}
              </div>
            )}

            {/* Input Usuario */}
            <div className="form-group mb-4">
              <span className="block mb-1 text-gray-600">Usuario</span>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  placeholder="Escriba su nombre de usuario o email"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <UserIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="mb-6 relative">
              <span className="block mb-1 text-gray-600">Contraseña</span>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Escriba su contraseña"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading || isRedirecting}
                />
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Botón Entrar */}
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading || isRedirecting}
              className="Boton flex justify-center w-full cursor-pointer rounded-lg border color-tyz text-white py-2 rounded-lg hover:bg-green-500 transition"
            >
              <ArrowRightStartOnRectangleIcon className="w-6 h-6 mr-1" />
              {isLoading ? "Iniciando sesión..." : "Entrar"}
            </button>

            {/* Registro */}
            <p className="text-center text-sm text-gray-600 mt-4">
              ¿No tienes una cuenta?{" "}
              <a href="/registro" className="text-green-600 hover:underline">
                Registrarse
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
