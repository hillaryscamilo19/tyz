import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileText, ChevronRight } from "lucide-react"

export function TicketDashboard() {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Mis asignados</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="abierto">
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger
                value="abierto"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] data-[state=active]:rounded-none"
              >
                Abierto
              </TabsTrigger>
              <TabsTrigger
                value="proceso"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] data-[state=active]:rounded-none"
              >
                Proceso
              </TabsTrigger>
              <TabsTrigger
                value="espera"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] data-[state=active]:rounded-none"
              >
                Espera
              </TabsTrigger>
              <TabsTrigger
                value="revision"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] data-[state=active]:rounded-none"
              >
                Revisión
              </TabsTrigger>
              <TabsTrigger
                value="completado"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] data-[state=active]:rounded-none"
              >
                Completado
              </TabsTrigger>
              <TabsTrigger
                value="cancelado"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] data-[state=active]:rounded-none"
              >
                Cancelado
              </TabsTrigger>
            </TabsList>
            <TabsContent value="abierto">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Ticket 3</span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Abierto</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Fecha: January 05, 2024 · Creado por: Rocío Alejandro Gómez
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Tecnología</span>
                        </div>
                        <span className="text-xs text-gray-500">Hace 5 días</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <span className="mr-2">Ver detalles</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Mostrar:</span>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-[70px] h-8">
                      <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">elementos por página</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-[#4CAF50] text-white">
                    1
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="proceso">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-gray-500">No hay tickets en proceso</p>
              </div>
            </TabsContent>
            <TabsContent value="espera">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-gray-500">No hay tickets en espera</p>
              </div>
            </TabsContent>
            <TabsContent value="revision">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-gray-500">No hay tickets en revisión</p>
              </div>
            </TabsContent>
            <TabsContent value="completado">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-gray-500">No hay tickets completados</p>
              </div>
            </TabsContent>
            <TabsContent value="cancelado">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-gray-500">No hay tickets cancelados</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
