// src/components/Navbar.tsx

import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-[#0f1f38] h-16 px-6 flex items-center justify-end text-white shadow-md">
      <div className="flex items-center gap-4">
        <span className="bg-green-500 w-4 h-4 rounded-full"></span>
        <div className="text-right">
          <p className="text-sm font-medium">Hilarys Camilo</p>
          <p className="text-xs">Tecnología </p>
        </div>
        <div className="flex -space-x-2 overflow-hidden">
          <FaUserCircle />
        </div>
      </div>
    </header>
  );
}
