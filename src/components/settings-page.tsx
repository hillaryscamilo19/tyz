"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")

    try {
      // Aquí iría la lógica para guardar la configuración
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      setError("Error al guardar la configuración. Inténtalo de nuevo.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración general</CardTitle>
              <CardDescription>Configura los ajustes generales del sistema de tickets.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nombre de la empresa</Label>
                    <Input id="company-name" defaultValue="TY2 Sistemas" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="support-email">Email de soporte</Label>
                    <Input id="support-email" type="email" defaultValue="soporte@ty2sistemas.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma predeterminado</Label>
                      <Select defaultValue="es">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">Inglés</SelectItem>
                          <SelectItem value="fr">Francés</SelectItem>
                          <SelectItem value="de">Alemán</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona horaria</Label>
                      <Select defaultValue="europe-madrid">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una zona horaria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europe-madrid">Europa/Madrid</SelectItem>
                          <SelectItem value="america-mexico">América/México</SelectItem>
                          <SelectItem value="america-bogota">América/Bogotá</SelectItem>
                          <SelectItem value="america-santiago">América/Santiago</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-assign">Asignación automática</Label>
                      <p className="text-sm text-muted-foreground">
                        Asignar automáticamente tickets a los agentes disponibles
                      </p>
                    </div>
                    <Switch id="auto-assign" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="public-tickets">Tickets públicos</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que los tickets sean visibles para todos los usuarios
                      </p>
                    </div>
                    <Switch id="public-tickets" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
                    {isSaving ? (
                      "Guardando..."
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Guardar cambios</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo se envían las notificaciones.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones por email</Label>
                      <p className="text-sm text-muted-foreground">
                        Enviar notificaciones por email cuando hay actividad en los tickets
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Eventos que generan notificaciones</h3>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-ticket">Nuevo ticket creado</Label>
                      <Switch id="new-ticket" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="ticket-assigned">Ticket asignado</Label>
                      <Switch id="ticket-assigned" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="ticket-updated">Ticket actualizado</Label>
                      <Switch id="ticket-updated" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="ticket-comment">Nuevo comentario</Label>
                      <Switch id="ticket-comment" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="ticket-closed">Ticket cerrado</Label>
                      <Switch id="ticket-closed" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Guardar cambios</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de categorías</CardTitle>
              <CardDescription>Administra las categorías disponibles para clasificar los tickets.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Nueva categoría..." />
                  <Button>Añadir</Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <span>Tecnología</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <span>Recursos Humanos</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <span>Finanzas</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <span>Operaciones</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Configuración avanzada</CardTitle>
              <CardDescription>Ajustes avanzados del sistema de tickets.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-prefix">Prefijo de tickets</Label>
                    <Input id="ticket-prefix" defaultValue="TK-" />
                    <p className="text-xs text-muted-foreground">
                      Este prefijo se añadirá a todos los números de ticket (ej. TK-2024-001)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-close">Cierre automático (días)</Label>
                    <Input id="auto-close" type="number" defaultValue="14" />
                    <p className="text-xs text-muted-foreground">
                      Número de días de inactividad antes de cerrar automáticamente un ticket
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Modo mantenimiento</Label>
                      <p className="text-sm text-muted-foreground">
                        Activar el modo de mantenimiento (solo administradores podrán acceder)
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Mensaje de mantenimiento</Label>
                    <Input
                      id="maintenance-message"
                      defaultValue="El sistema está en mantenimiento. Volveremos pronto."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Guardar cambios</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
