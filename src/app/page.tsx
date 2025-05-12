export default function Home() {
  // Redirigir a la página de login
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Sistema de Tickets TYZ</h1>
      <p className="text-lg mb-8">Bienvenido al sistema de gestión de tickets</p>
      <div className="flex gap-4">
        <a href="/auth/login" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition">
          Iniciar sesión
        </a>
        <a href="/auth/registro" className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-md transition">
          Registrarse
        </a>
      </div>
    </div>
  )
}
