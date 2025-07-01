"use client";

import WithRole from "#/components/auth/WithRole";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { LoadingSpinner } from "#/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Types
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  // Récupération des rôles
  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await fetch("/api/admin/roles");
      if (!res.ok) throw new Error("Erreur lors du chargement des rôles");
      return res.json() as Promise<Role[]>;
    },
  });

  // Récupération des détails d'un rôle
  const { isLoading: isLoadingRoleDetails } = useQuery({
    queryKey: ["role", selectedRole?.id],
    queryFn: async () => {
      if (!selectedRole?.id) return null;

      const res = await fetch(
        `/api/admin/roles/${selectedRole.id}/permissions`,
      );
      if (!res.ok) throw new Error("Erreur lors du chargement des permissions");

      const data = (await res.json()) as Permission[];
      setPermissions(data);
      return data;
    },
    enabled: !!selectedRole?.id,
  });

  // Mise à jour des permissions d'un rôle
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === permissionId ? { ...p, enabled: checked } : p)),
    );
  };

  // Ouverture du dialogue de modification
  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  // Enregistrement des modifications
  const handleSavePermissions = async () => {
    try {
      if (!selectedRole) return;

      const res = await fetch(
        `/api/admin/roles/${selectedRole.id}/permissions`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            permissions: permissions.filter((p) => p.enabled).map((p) => p.id),
          }),
        },
      );

      if (!res.ok) {
        const errorData = (await res.json()) as { message?: string };
        throw new Error(errorData.message ?? "Erreur lors de la mise à jour");
      }

      toast.success("Permissions mises à jour avec succès");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur inconnue");
    }
  };

  return (
    <WithRole allowedRoles={["admin"]}>
      <div className="container mx-auto py-10">
        <h1 className="mb-6 text-3xl font-bold">Gestion des rôles</h1>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rôle</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : roles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Aucun rôle trouvé
                  </TableCell>
                </TableRow>
              ) : (
                roles.map((role: Role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <Badge
                        variant={
                          role.name === "admin"
                            ? "destructive"
                            : role.name === "moderator"
                              ? "default"
                              : "outline"
                        }
                      >
                        {role.name}
                      </Badge>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge
                            key={permission.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {permission.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleEditRole(role)}
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Dialogue de modification des permissions */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Modifier les permissions: {selectedRole?.name}
              </DialogTitle>
              <DialogDescription>
                Cochez les permissions que vous souhaitez activer pour ce rôle.
              </DialogDescription>
            </DialogHeader>

            {isLoadingRoleDetails ? (
              <div className="flex h-40 items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={permission.id}
                      checked={permission.enabled}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(permission.id, checked === true)
                      }
                    />
                    <label
                      htmlFor={permission.id}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.name}
                      <p className="text-muted-foreground text-xs">
                        {permission.description}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSavePermissions}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </WithRole>
  );
}
