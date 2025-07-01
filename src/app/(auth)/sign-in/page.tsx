"use client";

import { AuthButtons } from "#/components/forms/auth-buttons";
import { SignInForm } from "#/components/forms/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import CustomSeparator from "#/components/ui/custom-separator";
import { LoadingSpinner } from "#/components/ui/loading-spinner";
import { useRedirectToDashboard } from "#/hooks/useRedirectToDashboard";
import { useSession } from "#/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const { data: session, isPending: loading } = useSession();
  const { isRedirecting } = useRedirectToDashboard();

  // Afficher un spinner si on est en train de charger ou rediriger
  if ((loading || isRedirecting) && session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-muted-foreground mt-4 text-sm">
          Redirection vers votre tableau de bord...
        </p>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, afficher le formulaire de connexion
  return (
    <Card className="mx-auto mt-10 w-full max-w-lg">
      <CardHeader>
        <CardTitle>Se Connecter</CardTitle>
        <CardDescription>Connecte toi à ton compte.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <SignInForm />
        </div>
        <CustomSeparator label={"Ou"} />
        <AuthButtons />
      </CardContent>
      <CardFooter>
        <div className="mt-2 flex items-center justify-center space-x-4">
          <p className="text-sm leading-1">
            Je n&apos;ai pas de compte,{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              créer un compte
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
