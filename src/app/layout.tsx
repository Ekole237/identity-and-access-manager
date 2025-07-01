import "#/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { BaseLayout } from "./_components/base-layout";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "IAM - Next.js",
  description: "Next.js + NextAuth.js + Drizzle ORM + Tailwind CSS",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Providers>
          <BaseLayout>
            {children}
            <Toaster />
          </BaseLayout>
        </Providers>
      </body>
    </html>
  );
}
