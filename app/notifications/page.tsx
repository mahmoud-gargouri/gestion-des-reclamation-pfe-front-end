"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  MoreHorizontal,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Données fictives pour les notifications
const notifications = [
  {
    id: 1,
    title: "Réclamation assignée",
    message:
      "Une nouvelle réclamation concernant le projecteur de la salle A101 vous a été assignée.",
    date: "2023-05-15T10:30:00",
    type: "info",
    read: false,
    category: "reclamation",
  },
  {
    id: 2,
    title: "Réclamation résolue",
    message:
      "La réclamation concernant le manque de chaises dans la salle B205 a été résolue.",
    date: "2023-05-14T14:45:00",
    type: "success",
    read: true,
    category: "reclamation",
  },
  {
    id: 3,
    title: "Maintenance planifiée",
    message:
      "Une maintenance est planifiée pour le système de climatisation de la salle C302 demain à 9h00.",
    date: "2023-05-13T09:15:00",
    type: "warning",
    read: false,
    category: "maintenance",
  },
  {
    id: 4,
    title: "Problème critique",
    message:
      "Panne électrique signalée dans le bâtiment D. Les techniciens ont été alertés.",
    date: "2023-05-12T16:20:00",
    type: "error",
    read: false,
    category: "alerte",
  },
  {
    id: 5,
    title: "Nouveau matériel disponible",
    message:
      "De nouveaux ordinateurs ont été installés dans la salle informatique E201.",
    date: "2023-05-11T11:00:00",
    type: "info",
    read: true,
    category: "materiel",
  },
  {
    id: 6,
    title: "Rappel de formation",
    message:
      "Rappel : La formation sur le nouveau système de gestion des réclamations aura lieu demain à 14h00.",
    date: "2023-05-10T08:30:00",
    type: "info",
    read: true,
    category: "formation",
  },
  {
    id: 7,
    title: "Mise à jour du système",
    message:
      "Le système sera mis à jour ce soir à 22h00. Une indisponibilité de 30 minutes est à prévoir.",
    date: "2023-05-09T17:45:00",
    type: "warning",
    read: false,
    category: "systeme",
  },
];

// Fonction pour formater la date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Aujourd'hui à ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else if (diffDays === 1) {
    return `Hier à ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${date.toLocaleDateString()} à ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
}

// Composant pour l'icône du type de notification
function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [notificationsState, setNotificationsState] = useState(notifications);

  // Filtrer les notifications
  const filteredNotifications = notificationsState.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || notification.category === categoryFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "read" && notification.read);

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Marquer une notification comme lue
  const markAsRead = (id: number) => {
    setNotificationsState(
      notificationsState.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotificationsState(
      notificationsState.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Compter les notifications non lues
  const unreadCount = notificationsState.filter(
    (notification) => !notification.read
  ).length;

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Notifications"
        text="Gérez vos notifications et restez informé des mises à jour."
      >
        <Button variant="outline" onClick={markAllAsRead}>
          <Check className="mr-2 h-4 w-4" />
          Tout marquer comme lu
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-4 sm:flex-row my-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher dans les notifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="reclamation">Réclamations</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="alerte">Alertes</SelectItem>
            <SelectItem value="materiel">Matériel</SelectItem>
            <SelectItem value="formation">Formation</SelectItem>
            <SelectItem value="systeme">Système</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="unread">
            Non lues
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="read">Lues</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Aucune notification trouvée
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={notification.read ? "opacity-75" : ""}
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    <NotificationIcon type={notification.type} />
                    <div className="ml-4">
                      <CardTitle className="text-base font-semibold">
                        {notification.title}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(notification.date)}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!notification.read && (
                        <DropdownMenuItem
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marquer comme lu
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <p>{notification.message}</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="capitalize">
                    {notification.category}
                  </Badge>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Aucune notification non lue trouvée
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card key={notification.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    <NotificationIcon type={notification.type} />
                    <div className="ml-4">
                      <CardTitle className="text-base font-semibold">
                        {notification.title}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(notification.date)}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => markAsRead(notification.id)}
                      >
                        Marquer comme lu
                      </DropdownMenuItem>
                      <DropdownMenuItem>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <p>{notification.message}</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="capitalize">
                    {notification.category}
                  </Badge>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Aucune notification lue trouvée
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className="opacity-75">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    <NotificationIcon type={notification.type} />
                    <div className="ml-4">
                      <CardTitle className="text-base font-semibold">
                        {notification.title}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(notification.date)}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <p>{notification.message}</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="capitalize">
                    {notification.category}
                  </Badge>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
