"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { ComplaintsList } from "@/components/complaints-list";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";
import { ComplaintForm } from "@/components/complaint-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProtectedRoute } from "@/components/protected-route";
import { PermissionGate } from "@/components/permission-gate";

export default function ReclamationsPage() {
  const [showForm, setShowForm] = useState(false);

  // Ces données seraient normalement récupérées depuis votre API
  const stats = {
    total: 254,
    pending: 45,
    inProgress: 20,
    resolved: 189,
  };

  return (
    <ProtectedRoute permissions={["reclamations:view"]}>
      <DashboardShell>
        <DashboardHeader
          heading="Réclamations"
          text="Consultez et gérez toutes les réclamations des clients."
        >
          <PermissionGate permissions={["reclamations:create"]}>
            <Button onClick={() => setShowForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle Réclamation
            </Button>
          </PermissionGate>
        </DashboardHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total des Réclamations
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Réclamations enregistrées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <FileText className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">
                Réclamations non traitées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">En Cours</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">
                Réclamations en traitement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Résolues</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <p className="text-xs text-muted-foreground">
                Réclamations résolues
              </p>
            </CardContent>
          </Card>
        </div>

        {showForm ? (
          <PermissionGate permissions={["reclamations:create"]}>
            <ComplaintForm onCancel={() => setShowForm(false)} />
          </PermissionGate>
        ) : (
          <ComplaintsList />
        )}
      </DashboardShell>
    </ProtectedRoute>
  );
}
