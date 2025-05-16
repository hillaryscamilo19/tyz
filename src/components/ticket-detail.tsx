"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, FileText, Paperclip, ChevronLeft, AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSession } from "next-auth/react"
import { TicketStatus, UserRoles } from "@/lib/models/types"

interface TicketDetailProps {
  ticketId: string
}

export function TicketDetail({ ticketId }: TicketDetailProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [ticket, setTicket] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messages, setMessages] = useState([])
  const [attachments, setAttachments] = useState([])
  const [users, setUsers] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${ticketId}`)
        if (!response.ok) {
          throw new Error("Error al cargar el ticket")
        }
        const data = await response.json()
        setTicket(data)
      } catch (error) {
        console.error("Error al cargar el ticket:", error)
        setError("Error al cargar el ticket. Por favor, inténtalo de nuevo.")
      } finally {
        setLoading(false)
      }
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/tickets/${ticketId}/messages`)
        if (response.ok) {
          const data = await response.json()
          setMessages(data)
        }
      } catch (error) {
        console.error("Error al cargar mensajes:", error)
      }
    }

    const fetchAttachments = async () => {
      try {
        const response = await fetch(`/api/tickets/${ticketId}/attachments`)
        if (response.ok) {
          const data = await response.json()
          setAttachments(data)
        }
      } catch (error) {
        console.error("Error al cargar adjuntos:", error)
      }
    }

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

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error)
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        }
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
      }
    }

    fetchTicket()
    fetchMessages()
    fetchAttachments()
    fetchDepartments()
    fetchCategories()
    fetchUsers()
  }, [ticketId])

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newComment }),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el comentario")
      }

      const newMessage = await response.json()
      setMessages([...messages, newMessage])
      setNewComment("")
    } catch (err) {
      setError("Error al enviar el comentario. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = async (value: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: Number.parseInt(value) }),
      })

      if (!response.ok) {
        throw new Error("Error al cambiar el estado del ticket")
      }

      const updatedTicket = await response.json()
      setTicket(updatedTicket)
    } catch (err) {
      setError("Error al cambiar el estado del ticket.")
    }
  }

  const getStatusBadgeVariant = (status: number) => {
    switch (status) {
      case TicketStatus.ABIERTO:
        return "default"
      case TicketStatus.PROCESO:
        return "secondary"
      case TicketStatus.ESPERA:
        return "outline"
      case TicketStatus.REVISION:
        return "secondary"
      case TicketStatus.COMPLETADO:
        return "default"
      case TicketStatus.CANCELADO:
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusLabel = (status: number) => {
    switch (status) {
      case TicketStatus.ABIERTO:
        return "Abierto"
      case TicketStatus.PROCESO:
        return "En proceso"
      case TicketStatus.ESPERA:
        return "En espera"
      case TicketStatus.REVISION:
        return "Revisión"
      case TicketStatus.COMPLETADO:
        return "Completado"
      case TicketStatus.CANCELADO:
        return "Cancelado"
      default:
        return "Desconocido"
    }
  }

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Función para calcular tiempo transcurrido
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} segundos`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutos`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} horas`
    return `${Math.floor(diffInSeconds / 86400)} días`
  }

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find((dept) => dept._id === departmentId)
    return department ? department.name : "Desconocido"
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId)
    return category ? category.name : "Desconocido"
  }

  const getUserName = (userId: string) => {
    const user = users.find((u) => u._id === userId)
    return user ? user.fullname : "Usuario desconocido"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>No se pudo cargar el ticket. Por favor, inténtalo de nuevo.</AlertDescription>
      </Alert>
    )
  }

  const canChangeStatus =
    session?.user?.role === UserRoles.ADMIN ||
    ticket.created_user === session?.user?.id ||
    ticket.assigned_users?.includes(session?.user?.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Volver a tickets
        </Button>

        {canChangeStatus && (
          <div className="flex items-center gap-2">
            <Select defaultValue={ticket.status.toString()} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cambiar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TicketStatus.ABIERTO.toString()}>Abierto</SelectItem>
                <SelectItem value={TicketStatus.PROCESO.toString()}>En proceso</SelectItem>
                <SelectItem value={TicketStatus.ESPERA.toString()}>En espera</SelectItem>
                <SelectItem value={TicketStatus.REVISION.toString()}>Revisión</SelectItem>
                <SelectItem value={TicketStatus.COMPLETADO.toString()}>Completado</SelectItem>
                <SelectItem value={TicketStatus.CANCELADO.toString()}>Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CardTitle>{ticket.title}</CardTitle>
                <Badge variant={getStatusBadgeVariant(ticket.status)}>{getStatusLabel(ticket.status)}</Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <span>Ticket #{ticket._id}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Creado hace {timeAgo(ticket.createdAt)}
                </span>
              </CardDescription>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end text-sm">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{ticket.category ? getCategoryName(ticket.category) : "Sin categoría"}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Departamento:{" "}
                  {ticket.assigned_department ? getDepartmentName(ticket.assigned_department) : "Sin asignar"}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="comments">Comentarios ({messages.length})</TabsTrigger>
              <TabsTrigger value="attachments">Adjuntos ({attachments.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">Creado por</h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getUserName(ticket.created_user).charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{getUserName(ticket.created_user)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">Asignado a</h4>
                  <div className="flex flex-wrap gap-2">
                    {ticket.assigned_users && ticket.assigned_users.length > 0 ? (
                      ticket.assigned_users.map((userId: string) => (
                        <div key={userId} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getUserName(userId).charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{getUserName(userId)}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">Sin asignar</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">Descripción</h4>
                <div className="p-4 border rounded-md bg-gray-50">
                  {ticket.description.startsWith("{") ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: JSON.parse(ticket.description)
                          .ops.map((op: any) => {
                            if (typeof op.insert === "string") {
                              return op.insert.replace(/\n/g, "<br />")
                            } else if (op.insert && op.insert.image) {
                              return `<img src="${op.insert.image}" alt="Imagen adjunta" style="max-width: 100%;" />`
                            }
                            return ""
                          })
                          .join(""),
                      }}
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">Fechas</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Creado:</p>
                    <p className="text-sm">{formatDate(ticket.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Última actualización:</p>
                    <p className="text-sm">{formatDate(ticket.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4 pt-4">
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((comment: any) => (
                    <div key={comment._id} className="p-3 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getUserName(comment.createdById).charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{getUserName(comment.createdById)}</div>
                          <div className="text-xs text-gray-500">{formatDate(comment.createdAt)}</div>
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{comment.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-gray-500">No hay comentarios para este ticket.</div>
                )}

                <form onSubmit={handleSubmitComment}>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Escribe un comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                        {isSubmitting ? "Enviando..." : "Enviar comentario"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-4 pt-4">
              {attachments.length > 0 ? (
                <div className="space-y-2">
                  {attachments.map((file: any) => (
                    <div key={file._id} className="flex items-center gap-2 p-2 border rounded-md">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{file.file_name}</span>
                      <span className="text-xs text-gray-500 ml-auto">{file.file_extension}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={`/uploads/${file.file_path.split("\\").pop()}`}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Descargar
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-gray-500">No hay archivos adjuntos para este ticket.</div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
