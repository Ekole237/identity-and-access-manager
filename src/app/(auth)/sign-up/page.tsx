import { AuthButtons } from "#/components/forms/auth-buttons";
import SignUpForm from "#/components/forms/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import CustomSeparator from "#/components/ui/custom-separator";

export default function SignUpPage() {
  return (
    <Card className="mx-auto mt-10 w-full max-w-lg">
      <CardHeader>
        <CardTitle>Se Connecter</CardTitle>
        <CardDescription>Connecte toi a ton compte.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <SignUpForm />
        </div>
        <CustomSeparator label={"Ou"} />
        <AuthButtons />
      </CardContent>
      <CardFooter>
        <div className="mt-2 flex items-center justify-center space-x-4">
          <p className="text-sm leading-1">
            J&apos;ai un compte,{" "}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              me connecter
            </a>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
