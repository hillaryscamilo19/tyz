// src/app/layout.tsx
import "@/./app/public/styles/globals.css";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;