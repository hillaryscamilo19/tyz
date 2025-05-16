"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Datos de ejemplo para las estadísticas
const ticketsByStatus = [
  { name: "Abiertos", value: 12, color: "#4CAF50" },
  { name: "En proceso", value: 8, color: "#2196F3" },
  { name: "En espera", value: 5, color: "#FFC107" },
  { name: "Resueltos", value: 15, color: "#9C27B0" },
  { name: "Cerrados", value: 10, color: "#F44336" },
]

const ticketsByCategory = [
  { name: "Tecnología", value: 20, color: "#4CAF50" },
  { name: "RR.HH.", value: 10, color: "#2196F3" },
  { name: "Finanzas", value: 8, color: "#FFC107" },
  { name: "Operaciones", value: 7, color: "#9C27B0" },
  { name: "Otros", value: 5, color: "#F44336" },
]

const ticketsByMonth = [
  { name: "Ene", abiertos: 8, resueltos: 5 },
  { name: "Feb", abiertos: 10, resueltos: 8 },
  { name: "Mar", abiertos: 15, resueltos: 12 },
  { name: "Abr", abiertos: 12, resueltos: 10 },
  { name: "May", abiertos: 18, resueltos: 15 },
]

const ticketsByPriority = [
  { name: "Baja", value: 15, color: "#4CAF50" },
  { name: "Media", value: 20, color: "#FFC107" },
  { name: "Alta", value: 10, color: "#FF9800" },
  { name: "Urgente", value: 5, color: "#F44336" },
]

export function DashboardStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">+12% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tickets abiertos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-5% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tiempo promedio de resolución</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5 días</div>
            <p className="text-xs text-muted-foreground">-1 día respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+3% respecto al mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="status">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="status">Por estado</TabsTrigger>
          <TabsTrigger value="category">Por categoría</TabsTrigger>
          <TabsTrigger value="monthly">Evolución mensual</TabsTrigger>
          <TabsTrigger value="priority">Por prioridad</TabsTrigger>
        </TabsList>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Tickets por estado</CardTitle>
              <CardDescription>Distribución de tickets según su estado actual</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {ticketsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>Tickets por categoría</CardTitle>
              <CardDescription>Distribución de tickets según su categoría</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {ticketsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Evolución mensual de tickets</CardTitle>
              <CardDescription>Comparativa de tickets abiertos vs. resueltos por mes</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ticketsByMonth}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="abiertos" fill="#4CAF50" />
                  <Bar dataKey="resueltos" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="priority">
          <Card>
            <CardHeader>
              <CardTitle>Tickets por prioridad</CardTitle>
              <CardDescription>Distribución de tickets según su nivel de prioridad</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketsByPriority}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {ticketsByPriority.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
