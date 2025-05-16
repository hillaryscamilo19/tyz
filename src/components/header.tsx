"use client"

import { User } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export function Header() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="border-b bg-white dark:bg-gray-800 p-4 flex justify-end items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch id="dark-mode" checked={theme === "dark"} onCheckedChange={handleThemeToggle} />
          <label htmlFor="dark-mode" className="text-sm text-gray-500 dark:text-gray-400">
            Modo oscuro
          </label>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-sm text-gray-500">{session?.user?.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-sm text-gray-500">{session?.user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/login" })}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
