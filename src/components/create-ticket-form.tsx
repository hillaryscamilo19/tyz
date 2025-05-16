"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSession } from "next-auth/react"

export function CreateTicketForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [department, setDepartment] = useState("")
  const [departments, setDepartments] = useState([])
  const [categories, setCategories] = useState([])
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    // Cargar departamentos
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments")
        if (response.ok) {
          const data = await response.json()
          setDepartments(data)
        }
      } catch (error) {
        console.error("Error al cargar departamentos:", error)
      }
    }

    fetchDepartments()
  }, [])

  useEffect(() => {
    // Cargar categorías basadas en el departamento seleccionado
    if (department) {
      const fetchCategories = async () => {
        try {
          const response = await fetch(`/api/categories?department=${department}`)
          if (response.ok) {
            const data = await response.json()
            setCategories(data)
          }
        } catch (error) {
          console.error("Error al cargar categorías:", error)
        }
      }

      fetchCategories()
    } else {
      setCategories([])
    }
  }, [department])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    if (!title || !description || !category || !department) {
      setError("Por favor, completa todos los campos requeridos.")
      setIsSubmitting(false)
      return
    }

    try {
      // Crear el ticket
      const ticketData = {
        title,
        description,
        category,
        assigned_department: department,
        created_user: session?.user?.id,
      }

      const ticketResponse = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      })

      if (!ticketResponse.ok) {
        throw new Error("Error al crear el ticket")
      }

      const newTicket = await ticketResponse.json()

      // Subir archivos adjuntos si hay alguno
      if (files.length > 0) {
        for (const file of files) {
          const formData = new FormData()
          formData.append("file", file)

          await fetch(`/api/tickets/${newTicket._id}/attachments`, {
            method: "POST",
            body: formData,
          })
        }
      }

      // Redirigir a la lista de tickets
      router.push("/dashboard/ticked")
      router.refresh()
    } catch (err) {
      setError("Error al crear el ticket. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Crear nuevo ticket</CardTitle>
        <CardDescription>Completa el formulario para crear una nueva solicitud o reporte de problema.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Describe brevemente el problema"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Select value={department} onValueChange={setDepartment} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept: any) => (
                    <SelectItem key={dept._id} value={dept._id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={!department || categories.length === 0}
                required
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={!department ? "Selecciona un departamento primero" : "Selecciona una categoría"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat: any) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe detalladamente el problema o solicitud"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Adjuntos (opcional)</Label>
            <Input id="attachments" type="file" multiple onChange={handleFileChange} />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear ticket"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
