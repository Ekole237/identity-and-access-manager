"use client";

import WithRole from "#/components/auth/WithRole";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { LoadingSpinner } from "#/components/ui/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, FileText, Shield, Users } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalUsers: number;
  activeRoles: number;
  totalLogs: number;
  recentLoginAttempts: number;
  failedLogins: number;
}

export default function AdminPage() {
  // Récupérer les statistiques du tableau de bord
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok)
        throw new Error("Erreur lors du chargement des statistiques");
      return res.json() as unknown as DashboardStats;
    },
    // En cas d'erreur, on affiche quand même la page avec des valeurs par défaut
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <WithRole allowedRoles={["admin"]}>
      <div className="container mx-auto py-10">
        <div className="mb-8 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-3xl font-bold">Panneau d&apos;Administration</h1>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link href="/admin/users">
                <Users className="h-4 w-4" />
                Utilisateurs
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link href="/admin/roles">
                <Shield className="h-4 w-4" />
                Rôles
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link href="/admin/audit-logs">
                <FileText className="h-4 w-4" />
                Logs
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Cartes de statistiques */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Utilisateurs Actifs
                  </CardTitle>
                  <Users className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.totalUsers ?? 0}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    +2.1% depuis le mois dernier
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Rôles Configurés
                  </CardTitle>
                  <Shield className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.activeRoles ?? 3}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Logs d&apos;Audit
                  </CardTitle>
                  <FileText className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.totalLogs ?? 0}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {stats?.recentLoginAttempts ?? 0} connexions récentes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tentatives échouées
                  </CardTitle>
                  <AlertTriangle className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.failedLogins ?? 0}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Alertes de sécurité:{" "}
                    {stats?.failedLogins && stats.failedLogins > 5
                      ? "Attention"
                      : "Aucune"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Modules principaux */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Utilisateurs</CardTitle>
                  <CardDescription>
                    Gérez les utilisateurs, leurs rôles et leurs permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted flex items-center justify-between rounded-md p-4">
                    <div>
                      <div className="text-xl font-semibold">
                        {stats?.totalUsers ?? 0}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        utilisateurs enregistrés
                      </div>
                    </div>
                    <Users className="text-muted-foreground h-8 w-8" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/admin/users">Gérer les utilisateurs</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Rôles</CardTitle>
                  <CardDescription>
                    Configurez les rôles et leurs permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted flex items-center justify-between rounded-md p-4">
                    <div>
                      <div className="text-xl font-semibold">
                        {stats?.activeRoles ?? 3}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        rôles configurés
                      </div>
                    </div>
                    <Shield className="text-muted-foreground h-8 w-8" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/admin/roles">Gérer les rôles</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Journal d&apos;audit</CardTitle>
                  <CardDescription>
                    Consultez les logs de connexion et d&apos;activité
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted flex items-center justify-between rounded-md p-4">
                    <div>
                      <div className="text-xl font-semibold">
                        {stats?.totalLogs ?? 0}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        entrées de journal
                      </div>
                    </div>
                    <FileText className="text-muted-foreground h-8 w-8" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/admin/audit-logs">Consulter les logs</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </WithRole>
  );
}
