"use client";

import { useSession } from "#/lib/auth-client";
import { cn } from "#/lib/utils";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();
  if (!session) {
    return (
      <div
        className={cn(
          "bg-primary fixed top-0 right-0 left-0 z-50 h-1 transition-opacity duration-300",
          isPending ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="bg-primary-foreground h-full w-full animate-pulse transition-all" />
      </div>
    );
  }
  return <>{children}</>;
};

export default ProfileLayout;
