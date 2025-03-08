import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react"

export function DashboardStats() {
  // Ces données seraient normalement récupérées depuis votre API
  const stats = [
    {
      title: "Total des Réclamations",
      value: "254",
      description: "Réclamations enregistrées",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "En Attente",
      value: "45",
      description: "Réclamations non traitées",
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Résolues",
      value: "189",
      description: "Réclamations résolues",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Urgentes",
      value: "20",
      description: "Nécessitent une attention immédiate",
      icon: AlertCircle,
      color: "text-red-500",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

