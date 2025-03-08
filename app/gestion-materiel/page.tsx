"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search } from "lucide-react"

const materiels = [
  { id: 1, nom: "Projecteur", salle: "A101", etat: "Bon état", derniereMaintenance: "2023-05-01" },
  { id: 2, nom: "Ordinateur", salle: "B205", etat: "En panne", derniereMaintenance: "2023-04-15" },
  { id: 3, nom: "Tableau interactif", salle: "C302", etat: "Bon état", derniereMaintenance: "2023-05-10" },
  { id: 4, nom: "Système audio", salle: "D401", etat: "Maintenance requise", derniereMaintenance: "2023-03-20" },
]

export default function GestionMaterielPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMateriels = materiels.filter(
    (materiel) =>
      materiel.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materiel.salle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gestion du Matériel"
        text="Gérez et suivez l'état du matériel dans les salles pédagogiques."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter du Matériel
        </Button>
      </DashboardHeader>

      <div className="flex items-center space-x-2 my-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher du matériel..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Salle</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Dernière Maintenance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMateriels.map((materiel) => (
            <TableRow key={materiel.id}>
              <TableCell>{materiel.nom}</TableCell>
              <TableCell>{materiel.salle}</TableCell>
              <TableCell>{materiel.etat}</TableCell>
              <TableCell>{materiel.derniereMaintenance}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardShell>
  )
}

