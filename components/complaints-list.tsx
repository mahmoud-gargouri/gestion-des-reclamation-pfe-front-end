"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search } from "lucide-react";
import { PermissionGate } from "@/components/permission-gate";

// Ces données seraient normalement récupérées depuis votre API
const complaints = [
  {
    id: "REC-001",
    client: "Jean Dupont",
    subject: "Produit défectueux",
    date: "2023-05-15",
    status: "resolved",
    priority: "high",
  },
  {
    id: "REC-002",
    client: "Marie Martin",
    subject: "Retard de livraison",
    date: "2023-05-18",
    status: "pending",
    priority: "medium",
  },
  {
    id: "REC-003",
    client: "Pierre Durand",
    subject: "Facturation incorrecte",
    date: "2023-05-20",
    status: "in-progress",
    priority: "low",
  },
  {
    id: "REC-004",
    client: "Sophie Leroy",
    subject: "Service client insatisfaisant",
    date: "2023-05-22",
    status: "pending",
    priority: "high",
  },
  {
    id: "REC-005",
    client: "Lucas Bernard",
    subject: "Remboursement non reçu",
    date: "2023-05-25",
    status: "resolved",
    priority: "medium",
  },
];

const statusMap = {
  pending: { label: "En attente", color: "bg-yellow-500" },
  "in-progress": { label: "En cours", color: "bg-blue-500" },
  resolved: { label: "Résolu", color: "bg-green-500" },
};

const priorityMap = {
  low: { label: "Faible", color: "bg-gray-500" },
  medium: { label: "Moyenne", color: "bg-orange-500" },
  high: { label: "Haute", color: "bg-red-500" },
};

export function ComplaintsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="in-progress">En cours</SelectItem>
            <SelectItem value="resolved">Résolu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="hidden md:table-cell">Sujet</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="hidden sm:table-cell">Priorité</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Aucune réclamation trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.client}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                    {complaint.subject}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(complaint.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        statusMap[complaint.status as keyof typeof statusMap]
                          .color
                      } text-white`}
                    >
                      {
                        statusMap[complaint.status as keyof typeof statusMap]
                          .label
                      }
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={`${
                        priorityMap[
                          complaint.priority as keyof typeof priorityMap
                        ].color
                      } text-white`}
                    >
                      {
                        priorityMap[
                          complaint.priority as keyof typeof priorityMap
                        ].label
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <PermissionGate permissions={["reclamations:edit"]}>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Changer le statut</DropdownMenuItem>
                        </PermissionGate>
                        <PermissionGate permissions={["reclamations:delete"]}>
                          <DropdownMenuItem className="text-red-500">
                            Supprimer
                          </DropdownMenuItem>
                        </PermissionGate>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
