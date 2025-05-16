import type React from "react"

import { Header } from "@/components/header"
import { AuthCheck } from "@/components/auth-check"
import Sidebar from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthCheck>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 bg-gray-100">{children}</main>
        </div>
      </div>
    </AuthCheck>
  )
}
