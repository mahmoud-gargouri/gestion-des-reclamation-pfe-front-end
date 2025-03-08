"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { ComplaintsList } from "@/components/complaints-list";
import { DashboardStats } from "@/components/dashboard-stats";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ComplaintForm } from "@/components/complaint-form";

export default function DashboardPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gestion des Réclamations"
        text="Gérez et suivez toutes les réclamations des clients."
      >
        <Button onClick={() => setShowForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle Réclamation
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>

      {showForm ? (
        <ComplaintForm onCancel={() => setShowForm(false)} />
      ) : (
        <ComplaintsList />
      )}
    </DashboardShell>
  );
}
