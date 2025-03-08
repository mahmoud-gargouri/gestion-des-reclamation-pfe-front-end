"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// This would normally come from your API
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "teacher" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "student" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "technicien" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "administrator" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "student" },
]

const roleColors = {
  teacher: "bg-blue-500",
  student: "bg-green-500",
  technicien: "bg-yellow-500",
  administrator: "bg-purple-500",
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des Utilisateurs" text="Gérez les utilisateurs du système et leurs rôles.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvel Utilisateur
        </Button>
      </DashboardHeader>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un utilisateur..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrer par rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="teacher">Enseignant</SelectItem>
              <SelectItem value="student">Étudiant</SelectItem>
              <SelectItem value="technicien">Technicien</SelectItem>
              <SelectItem value="administrator">Administrateur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={`${roleColors[user.role as keyof typeof roleColors]} text-white`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  )
}

