import { signOut } from "#/lib/auth-client";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  return (
    <Button
      variant="link"
      className="text-white hover:text-gray-300"
      onClick={async () => {
        await signOut();
      }}
    >
      Logout
    </Button>
  );
};
