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
import { signUp } from "#/lib/auth-client";
import {
  type SignUpFormValues,
  signUpSchema,
} from "#/lib/validations/register-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (values: SignUpFormValues) => {
    const { error } = await signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: "/sign-in",
      },
      {
        onRequest: () => {
          toast.loading("Creationg du compte...", { id: "sign-up" });
        },
        onSuccess: async (ctx) => {
          toast.success("Votre compte a été créé avec succès");
          toast.dismiss("sign-up");
          router.push("/sign-in");
          await fetch("/api/auth/logger", {
            method: "POST",
            body: JSON.stringify({
              userId: ctx.data?.user?.id,
              eventType: "register",
              eventDetails: JSON.stringify({ email: values.email }),
              success: true,
              authMethod: "email_password",
            }),
          });
        },
        onError: async (ctx) => {
          toast.dismiss("sign-up");
          toast.error("Une erreur est survenue lors de la création du compte");
          await fetch("/api/auth/logger", {
            method: "POST",
            body: JSON.stringify({
              userId: ctx.error?.user?.id,
              eventType: "register_failure",
              eventDetails: JSON.stringify({ email: values.email }),
              success: false,
              authMethod: "email_password",
            }),
          });
        },
      },
    );

    if (error) {
      toast.error("Une erreur est survenue lors de la création du compte");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Ekodev" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Ex: ekoledev@dev.com"
                  {...field}
                />
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
                <Input type="password" placeholder="Ex: ******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmez votre mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Ex: ******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Creer mon compte
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
