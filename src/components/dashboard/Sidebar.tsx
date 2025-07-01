"use client";

import { Activity, Home, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 border-r bg-white px-4 py-6">
      <div className="mb-8 flex items-center gap-2 text-xl font-bold">
        <Shield className="text-blue-600" />
        IAM Admin
      </div>

      <nav className="flex flex-col gap-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-blue-100 ${
              pathname === href ? "bg-blue-100 text-blue-700" : "text-gray-700"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
