"use client";

import { signIn } from "#/lib/auth-client";
import { Github } from "lucide-react";
import { Button } from "../ui/button";

export const GhBtn = () => {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await signIn.social({
          provider: "github",
          callbackURL: "/profile",
        });
      }}
    >
      <Github className="mr-2 h-4 w-4" />
      Github
    </Button>
  );
};
