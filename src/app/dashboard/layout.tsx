import type React from "react"

import { Header } from "@/components/header"
import { AuthCheck } from "@/components/auth-check"
import Sidebar from "@/components/sidebar"
import "./styles.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthCheck>
      <div className="flex h-screen ">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </AuthCheck>
  )
}
