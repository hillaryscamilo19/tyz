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
  return (
    <div className="space-y-6">
    
    </div>
  )
}
