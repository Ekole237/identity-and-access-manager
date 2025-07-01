"use client";

import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
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
import { usePermission } from "#/hooks/usePermision";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { MoreHorizontal, Pencil, Shield, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../ui/loading-spinner";

// Types
interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  role: string;
}

interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
}

interface EditFormData {
  name: string;
  email: string;
}

// Constants
const ROLES = [
  { value: "user", label: "Utilisateur" },
  { value: "moderator", label: "Modérateur" },
  { value: "admin", label: "Administrateur" },
] as const;

const ROLE_STYLES = {
  admin: "bg-purple-50 text-purple-700",
  moderator: "bg-blue-50 text-blue-700",
  default: "bg-gray-50 text-gray-700",
} as const;

// Custom hooks
const useUsers = (searchQuery: string, hasPermission: boolean) => {
  return useQuery({
    queryKey: ["users", searchQuery],
    queryFn: async (): Promise<User[]> => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs");
      }

      const data = (await res.json()) as ApiResponse<User[]>;
      return data.data;
    },
    enabled: hasPermission === true,
  });
};

const useUserMutations = () => {
  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: async (userData: UpdateUserData): Promise<User> => {
      const res = await fetch(`/api/admin/users/${userData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const error = (await res.json()) as ApiError;
        throw new Error(error.message ?? "Erreur lors de la mise à jour");
      }

      const data = (await res.json()) as ApiResponse<User>;
      return data.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Utilisateur mis à jour avec succès");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string): Promise<{ success: boolean }> => {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = (await res.json()) as ApiError;
        throw new Error(error.message ?? "Erreur lors de la suppression");
      }

      return res.json() as Promise<{ success: boolean }>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Utilisateur supprimé avec succès");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, deleteUser };
};

// Components
interface UserAvatarProps {
  user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => (
  <div className="flex items-center gap-3">
    {user.image && (
      <Image
        src={user.image}
        alt={user.name ?? "Avatar"}
        className="h-8 w-8 rounded-full object-cover"
        width={32}
        height={32}
      />
    )}
    {user.name ?? "Anonyme"}
  </div>
);

interface UserRoleBadgeProps {
  role: string;
}

const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  const roleStyle =
    role === "admin"
      ? ROLE_STYLES.admin
      : role === "moderator"
        ? ROLE_STYLES.moderator
        : ROLE_STYLES.default;

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${roleStyle}`}>
      {role}
    </span>
  );
};

interface UserActionsMenuProps {
  user: User;
  onEdit: (user: User) => void;
  onChangeRole: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserActionsMenu = ({
  user,
  onEdit,
  onChangeRole,
  onDelete,
}: UserActionsMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => onEdit(user)}
        className="flex items-center gap-2"
      >
        <Pencil className="h-4 w-4" /> Modifier
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onChangeRole(user)}
        className="flex items-center gap-2"
      >
        <Shield className="h-4 w-4" /> Changer de rôle
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onDelete(user)}
        className="flex items-center gap-2 text-red-600"
      >
        <Trash2 className="h-4 w-4" /> Supprimer
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

interface EditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  editForm: EditFormData;
  onFormChange: (form: EditFormData) => void;
  onSave: () => void;
  isLoading: boolean;
}

const EditUserDialog = ({
  isOpen,
  onClose,
  user,
  editForm,
  onFormChange,
  onSave,
  isLoading,
}: EditUserDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Modifier un utilisateur</DialogTitle>
        <DialogDescription>
          Modifiez les informations de l&apos;utilisateur.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            value={editForm.name}
            onChange={(e) =>
              onFormChange({ ...editForm, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={editForm.email}
            onChange={(e) =>
              onFormChange({ ...editForm, email: e.target.value })
            }
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

interface RoleChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const RoleChangeDialog = ({
  isOpen,
  onClose,
  selectedRole,
  onRoleChange,
  onSave,
  isLoading,
}: RoleChangeDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Changer le rôle</DialogTitle>
        <DialogDescription>
          Sélectionnez un nouveau rôle pour cet utilisateur.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <Select value={selectedRole} onValueChange={onRoleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: DeleteConfirmDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogDescription>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est
          irréversible.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "Suppression..." : "Supprimer"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Main component
interface UserManagementProps {
  searchQuery?: string;
}

export function UserManagement({ searchQuery = "" }: UserManagementProps) {
  const { hasPermission, loading: permissionLoading } =
    usePermission("manage_users");
  const { data: users = [], isLoading } = useUsers(searchQuery, hasPermission!);
  const { updateUser, deleteUser } = useUserMutations();

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  // Selected user and form states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<EditFormData>({
    name: "",
    email: "",
  });
  const [selectedRole, setSelectedRole] = useState("");

  // Memoized handlers
  const handleDeleteClick = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleEditClick = useCallback((user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name ?? "",
      email: user.email,
    });
    setIsEditDialogOpen(true);
  }, []);

  const handleRoleClick = useCallback((user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setIsRoleDialogOpen(true);
  }, []);

  const handleUpdateUser = useCallback(() => {
    if (!selectedUser) return;

    updateUser.mutate(
      {
        id: selectedUser.id,
        name: editForm.name,
        email: editForm.email,
      },
      {
        onSuccess: () => setIsEditDialogOpen(false),
      },
    );
  }, [selectedUser, editForm, updateUser]);

  const handleUpdateRole = useCallback(() => {
    if (!selectedUser) return;

    updateUser.mutate(
      {
        id: selectedUser.id,
        role: selectedRole,
      },
      {
        onSuccess: () => setIsRoleDialogOpen(false),
      },
    );
  }, [selectedUser, selectedRole, updateUser]);

  const handleDeleteUser = useCallback(() => {
    if (!selectedUser) return;

    deleteUser.mutate(selectedUser.id, {
      onSuccess: () => setIsDeleteDialogOpen(false),
    });
  }, [selectedUser, deleteUser]);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  }, []);

  const handleCloseRoleDialog = useCallback(() => {
    setIsRoleDialogOpen(false);
    setSelectedUser(null);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  }, []);

  // Memoized table content
  const tableContent = useMemo(() => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            <LoadingSpinner />
          </TableCell>
        </TableRow>
      );
    }

    if (users.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            Aucun utilisateur trouvé
          </TableCell>
        </TableRow>
      );
    }

    return users.map((user) => (
      <TableRow key={user.id}>
        <TableCell className="font-medium">
          <UserAvatar user={user} />
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <UserRoleBadge role={user.role} />
        </TableCell>
        <TableCell>
          {format(new Date(user.createdAt), "P", { locale: fr })}
        </TableCell>
        <TableCell>
          {user.emailVerified ? (
            <span className="text-green-600">Oui</span>
          ) : (
            <span className="text-red-600">Non</span>
          )}
        </TableCell>
        <TableCell>
          <UserActionsMenu
            user={user}
            onEdit={handleEditClick}
            onChangeRole={handleRoleClick}
            onDelete={handleDeleteClick}
          />
        </TableCell>
      </TableRow>
    ));
  }, [users, isLoading, handleDeleteClick, handleEditClick, handleRoleClick]);

  // Early returns
  if (permissionLoading) return <LoadingSpinner />;
  if (!hasPermission) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Date d&apos;inscription</TableHead>
            <TableHead>Vérifié</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tableContent}</TableBody>
      </Table>

      <EditUserDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        user={selectedUser}
        editForm={editForm}
        onFormChange={setEditForm}
        onSave={handleUpdateUser}
        isLoading={updateUser.isPending}
      />

      <RoleChangeDialog
        isOpen={isRoleDialogOpen}
        onClose={handleCloseRoleDialog}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        onSave={handleUpdateRole}
        isLoading={updateUser.isPending}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteUser}
        isLoading={deleteUser.isPending}
      />
    </div>
  );
}
