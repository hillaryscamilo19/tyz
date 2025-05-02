import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Menú</h2>
      <ul className="space-y-2">
        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
        <li><a href="/tickets" className="hover:underline">Tickets</a></li>
        <li><a href="/login" className="hover:underline">Login</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
