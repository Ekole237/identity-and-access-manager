"use client";

import { Button } from "#/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import { signIn } from "#/lib/auth-client";
import { getDashboardPathForRole } from "#/lib/dashboard-redirect";
import {
  type SignInFormValues,
  signInSchema,
} from "#/lib/validations/login-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = async (data: SignInFormValues) => {
    const { email, password } = data;
    const { error, data: result } = await signIn.email(
      {
        email,
        password,
        callbackURL: "/sign-in",
      },
      {
        onRequest: () => {
          setLoading(true);
          toast.loading("Connexion...", { id: "sign-in" });
        },
        onSuccess: async (ctx) => {
          toast.success("Connexion réussie");
          toast.dismiss("sign-in");

          try {
            // Rediriger vers le tableau de bord approprié en fonction du rôle
            const dashboardPath = await getDashboardPathForRole({
              user: ctx.data?.user,
            });
            router.push(dashboardPath);
          } catch (error) {
            console.error("Erreur de redirection:", error);
            // Fallback à la page de profil en cas d'erreur
            router.push("/profile");
          }

          // Logger l'événement de connexion
          await fetch("/api/auth/logger", {
            method: "POST",
            body: JSON.stringify({
              userId: ctx.data?.user?.id,
              eventType: "login_success",
              eventDetails: JSON.stringify({ email }),
              success: true,
              authMethod: "email_password",
            }),
          });
        },
        onError: async (ctx) => {
          setLoading(false);
          toast.dismiss("sign-in");
          toast.error("Une erreur est survenue lors de la connexion");
          await fetch("/api/auth/logger", {
            method: "POST",
            body: JSON.stringify({
              userId: ctx.error?.user?.id,
              eventType: "login_failure",
              eventDetails: JSON.stringify({ email }),
              success: false,
              authMethod: "email_password",
            }),
          });
        },
      },
    );

    if (error) {
      setLoading(false);
      toast.error("Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ex: ekoledev@dev.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Ex: ******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 className="mr-2 animate-spin" /> : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
};
