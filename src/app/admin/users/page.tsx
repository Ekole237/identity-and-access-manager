"use client";

import WithRole from "#/components/auth/WithRole";
import { UserManagement } from "#/components/features/UserManagement";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { useDebounce } from "#/hooks/useDebounce";
import { useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <WithRole allowedRoles={["admin"]}>
      <div className="container mx-auto py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-xs"
            />
            <Button>Ajouter un utilisateur</Button>
          </div>
        </div>

        <UserManagement searchQuery={debouncedSearch} />
      </div>
    </WithRole>
  );
}
