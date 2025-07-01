"use client";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Label } from "#/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { useSession } from "#/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import ProfileLayout from "./layout";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [userDetails, setUserDetails] = useState({
    name: session?.user.name,
    email: session?.user.email,
    location: session?.user.location,
    bio: session?.user.bio,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil mis à jour");
  };

  return (
    <ProfileLayout>
      <div className="container max-w-4xl py-10">
        <div className="flex flex-col gap-8">
          {/* En-tête du profil avec avatar */}
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userDetails?.image} alt={userDetails?.name} />
              <AvatarFallback>
                {userDetails?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold">{userDetails?.name}</h1>
              <p className="text-muted-foreground">{userDetails?.location}</p>
            </div>
          </div>

          {/* Onglets du profil */}
          <Tabs defaultValue="informations" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="informations">Informations</TabsTrigger>
              <TabsTrigger value="parametres">Paramètres</TabsTrigger>
            </TabsList>

            {/* Contenu de l'onglet Informations */}
            <TabsContent value="informations">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du profil</CardTitle>
                  <CardDescription>
                    Visualisez les détails de votre profil utilisateur.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label>Nom complet</Label>
                    <div className="bg-muted rounded-md px-4 py-2">
                      {userDetails.name}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <div className="bg-muted rounded-md px-4 py-2">
                      {userDetails?.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Localisation</Label>
                    <div className="bg-muted rounded-md px-4 py-2">
                      {userDetails?.location}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Bio</Label>
                    <div className="bg-muted rounded-md px-4 py-2 whitespace-pre-line">
                      {userDetails?.bio}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProfileLayout>
  );
}
