"use client";

import { LogoutButton } from "#/components/forms/logout-btn";
import { useSession } from "#/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define extended session type with user role
interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string; // Add role property
}

interface ExtendedSession {
  user: ExtendedUser;
  expires: string;
}

export const Navbar = () => {
  const { data: session } = useSession();
  const userRole = (session as ExtendedSession | null)?.user?.role;
  const pathname = usePathname();

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Active link class
  const activeLinkClass = "text-blue-300 font-medium underline";
  const defaultLinkClass = "hover:underline";

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-gray-800 p-4 text-white">
      <Link
        href="/"
        className={`text-2xl font-bold ${isActive("/") && pathname === "/" ? "text-blue-300" : ""}`}
      >
        IAM
      </Link>
      <nav>
        <ul className="flex items-center space-x-4 text-sm">
          {session ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className={
                    isActive("/profile") ? activeLinkClass : defaultLinkClass
                  }
                >
                  Profile
                </Link>
              </li>
              {userRole === "admin" && (
                <>
                  <li>
                    <Link
                      href="/admin"
                      className={
                        isActive("/admin") && pathname === "/admin"
                          ? activeLinkClass
                          : defaultLinkClass
                      }
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/audit-logs"
                      className={
                        isActive("/admin/audit-logs")
                          ? activeLinkClass
                          : defaultLinkClass
                      }
                    >
                      Audit Logs
                    </Link>
                  </li>
                </>
              )}
              {userRole === "moderator" && (
                <li>
                  <Link
                    href="/moderator"
                    className={
                      isActive("/moderator")
                        ? activeLinkClass
                        : defaultLinkClass
                    }
                  >
                    Moderator
                  </Link>
                </li>
              )}
              {userRole === "user" && (
                <li>
                  <Link
                    href="/user"
                    className={
                      isActive("/user") ? activeLinkClass : defaultLinkClass
                    }
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton />
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/sign-in"
                className={
                  isActive("/sign-in") ? activeLinkClass : defaultLinkClass
                }
              >
                Sign in
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/about"
              className={
                isActive("/about") ? activeLinkClass : defaultLinkClass
              }
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
