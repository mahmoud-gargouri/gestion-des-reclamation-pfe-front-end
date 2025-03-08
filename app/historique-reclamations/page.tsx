"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const reclamations = [
  { id: 1, description: "Projecteur en panne", salle: "A101", date: "2023-05-15", statut: "Résolu" },
  { id: 2, description: "Manque de chaises", salle: "B205", date: "2023-05-10", statut: "En cours" },
  { id: 3, description: "Problème de climatisation", salle: "C302", date: "2023-05-05", statut: "En attente" },
  { id: 4, description: "Tableau non effacé", salle: "D401", date: "2023-05-01", statut: "Résolu" },
]

export default function HistoriqueReclamationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReclamations = reclamations.filter(
    (reclamation) =>
      (reclamation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.salle.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || reclamation.statut === statusFilter),
  )

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Historique des Réclamations"
        text="Consultez l'historique et l'évolution des réclamations."
      />

      <div className="flex items-center space-x-2 my-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une réclamation..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="En attente">En attente</SelectItem>
            <SelectItem value="En cours">En cours</SelectItem>
            <SelectItem value="Résolu">Résolu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Salle</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReclamations.map((reclamation) => (
            <TableRow key={reclamation.id}>
              <TableCell>{reclamation.description}</TableCell>
              <TableCell>{reclamation.salle}</TableCell>
              <TableCell>{reclamation.date}</TableCell>
              <TableCell>{reclamation.statut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardShell>
  )
}

