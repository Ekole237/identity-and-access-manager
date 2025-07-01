"use client";

import WithRole from "#/components/auth/WithRole";
import { Input } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import { useDebounce } from "#/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { useMemo, useState } from "react";

type AuditLog = {
  id: string;
  userId: string | null;
  userName: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  authMethod: string;
  eventType: string;
  eventDetails: string;
  success: boolean;
  timestamp: string;
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const debouncedSearch = useDebounce(search, 500);

  // Charger les logs d'audit
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["audit-logs", debouncedSearch, filter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (filter !== "all") params.append("eventType", filter);

      const res = await fetch(`/api/audit/logs?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch logs");
      return res.json();
    },
  });

  const eventTypeOptions = useMemo(
    () => [
      { value: "all", label: "Tous les événements" },
      { value: "login_success", label: "Connexion réussie" },
      { value: "login_failure", label: "Échec de connexion" },
      { value: "logout", label: "Déconnexion" },
      { value: "register", label: "Inscription" },
      { value: "password_reset", label: "Réinitialisation mot de passe" },
      { value: "access_denied", label: "Accès refusé" },
      { value: "role_change", label: "Changement de rôle" },
    ],
    [],
  );

  return (
    <WithRole allowedRoles={["admin"]}>
      <div className="container mx-auto py-10">
        <h1 className="mb-6 text-3xl font-bold">Journal d&apos;audit</h1>

        <div className="mb-6 flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-xs"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="Type d'événement" />
            </SelectTrigger>
            <SelectContent>
              {eventTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Événement</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Méthode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Chargement des logs...
                  </TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucun log trouvé
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log: AuditLog) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {formatDistanceToNow(new Date(log.timestamp), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell>{log.userName ?? "Anonyme"}</TableCell>
                    <TableCell>
                      {eventTypeOptions.find(
                        (opt) => opt.value === log.eventType,
                      )?.label ?? log.eventType}
                    </TableCell>
                    <TableCell>{log.ipAddress ?? "-"}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          log.success
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {log.success ? "Succès" : "Échec"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {log.authMethod === "email_password"
                        ? "Email/Mot de passe"
                        : log.authMethod}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </WithRole>
  );
}
