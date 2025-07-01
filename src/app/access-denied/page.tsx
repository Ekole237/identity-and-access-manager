"use client";

import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <ShieldAlert className="mb-6 h-20 w-20 text-red-600" />
      <h1 className="mb-2 text-4xl font-bold text-gray-800">Access Denied</h1>
      <p className="mb-6 text-gray-600">
        You do not have permission to access this page.
        <br />
        Please contact your administrator or try logging in with sufficient
        privileges.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Go to Home
        </Link>
        <Link
          href="/login"
          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
