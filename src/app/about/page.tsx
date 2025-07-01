"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-black opacity-20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              Identity & Access Management
            </h1>

            <p className="mb-8 text-xl opacity-90">
              Sécurité, contrôle et gestion des accès utilisateurs dans les
              applications modernes
            </p>
          </div>
        </div>
      </header>

      {/* What is IAM Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative h-96 overflow-hidden rounded-lg shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Sécurité et gestion des identités"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                Qu&apos;est-ce que l&apos;IAM ?
              </h2>
              <p className="mb-6 text-gray-600">
                L&apos;Identity and Access Management (IAM) est un cadre de
                politiques et de technologies qui garantit que les bonnes
                personnes ont accès aux bonnes ressources technologiques dans
                les bonnes conditions.
              </p>
              <p className="mb-6 text-gray-600">
                L&apos;IAM comprend l&apos;identification,
                l&apos;authentification, l&apos;autorisation et la gestion des
                privilèges des utilisateurs, ce qui permet aux organisations de
                gérer efficacement les identités numériques et les droits
                d&apos;accès.
              </p>
              <p className="text-gray-600">
                Avec la transformation numérique accélérée et le nombre
                croissant de cyber-menaces, l&apos;IAM est devenu un élément
                essentiel de la stratégie de sécurité de toute organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why IAM is Important Section */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Pourquoi l&apos;IAM est crucial
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Les avantages stratégiques d&apos;une gestion efficace des identités
            et des accès
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Sécurité renforcée",
              description:
                "Protection contre les accès non autorisés et réduction des risques de violation de données par une authentification robuste et des contrôles d&apos;accès précis.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
            },
            {
              title: "Conformité réglementaire",
              description:
                "Respect des réglementations en matière de protection des données (RGPD, CCPA, etc.) grâce à des contrôles d&apos;accès vérifiables et à une gestion claire des consentements.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
            },
            {
              title: "Expérience utilisateur améliorée",
              description:
                "Authentification fluide et unifiée, connexion unique (SSO) et auto-enregistrement pour une meilleure satisfaction des utilisateurs et une productivité accrue.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map((value, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex justify-center">{value.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Implementation Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Notre Implémentation IAM
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Comment nous avons intégré l&apos;IAM dans notre projet avec
              Next.js, Drizzle et Neon
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                Technologies utilisées
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Better-Auth :</strong>{" "}
                    Bibliothèque d'authentification personnalisée pour Next.js
                    avec support pour diverses méthodes d'authentification.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Drizzle ORM :</strong>{" "}
                    Schéma typé avec relations pour utilisateurs, rôles,
                    permissions et journaux d'authentification.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Neon Database :</strong>{" "}
                    Base de données PostgreSQL serverless pour stocker les
                    informations utilisateurs, sessions et audits de sécurité.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">
                      Middleware Next.js :
                    </strong>{" "}
                    Pour la protection des routes et la redirection intelligente
                    des utilisateurs selon leur statut d'authentification.
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                Fonctionnalités IAM implémentées
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">
                      Authentification multi-méthodes :
                    </strong>{" "}
                    Email/mot de passe, OAuth 2.0 (Google, GitHub) et
                    possibilité d'étendre à Magic Link et 2FA.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Système RBAC :</strong>{" "}
                    Rôles prédéfinis (user, moderator, admin) avec permissions
                    granulaires gérées dans la base de données.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Audit de sécurité :</strong>{" "}
                    Suivi et journalisation des événements d'authentification
                    (connexions réussies/échouées, déconnexions, changements de
                    rôle).
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">
                      Composants de protection :
                    </strong>{" "}
                    Composant WithRole pour limiter l'accès aux interfaces selon
                    les rôles des utilisateurs.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Exemple d&apos;implémentation
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Aperçu de notre code d&apos;authentification avec Better-Auth et
              Drizzle
            </p>
          </div>

          <div className="overflow-hidden rounded-xl shadow-lg">
            <div className="bg-gray-800 px-4 py-2 font-mono text-sm text-white">
              auth.ts
            </div>
            <div className="overflow-x-auto bg-gray-900 p-6">
              <pre className="text-sm text-gray-300">
                <code>{`import { db } from "#/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [admin(), nextCookies()],
});

export const getServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Prêt à sécuriser votre application ?
          </h2>

          <p className="mb-10 text-xl opacity-90">
            Notre solution IAM vous permet de protéger vos données et
            d&apos;offrir une expérience utilisateur fluide
          </p>

          <div>
            <Link
              href="/sign-in"
              className="mr-4 inline-block transform rounded-full bg-white px-8 py-3 font-medium text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Essayer maintenant
            </Link>
            <Link
              href="/"
              className="inline-block transform rounded-full border-2 border-white px-8 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 px-4 py-12 text-gray-300 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Mon App</h3>
            <p className="opacity-75">
              Une solution complète de gestion des identités et des accès pour
              vos applications.
            </p>
          </div>
          <div>
            <h4 className="text-md mb-4 font-medium text-white">
              Liens rapides
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  À propos de l&apos;IAM
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="transition-colors hover:text-white"
                >
                  Se connecter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md mb-4 font-medium text-white">Contact</h4>
            <ul className="space-y-2">
              <li>contact@monapp.com</li>
              <li>01 23 45 67 89</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-gray-700 pt-8 text-center">
          <p className="opacity-75">
            © {new Date().getFullYear()} Mon App. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
