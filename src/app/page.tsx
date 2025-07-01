"use client";

import { useRedirectToDashboard } from "#/hooks/useRedirectToDashboard";
import { useSession } from "#/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();
  // Utilise le hook pour rediriger si l'utilisateur est connecté
  useRedirectToDashboard();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="relative flex h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-blue-500 opacity-5"></div>
          <div className="absolute top-0 right-0 z-0 h-1/2 w-1/2 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-purple-500 opacity-10 blur-3xl filter"></div>
          <div className="absolute bottom-0 left-0 z-0 h-1/2 w-1/2 -translate-x-1/3 translate-y-1/3 transform rounded-full bg-blue-500 opacity-10 blur-3xl filter"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.h1
            className="mb-6 text-5xl font-bold text-gray-800 sm:text-6xl md:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.7 }}
          >
            Une expérience{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              exceptionnelle
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 sm:text-2xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Découvrez notre plateforme intuitive et puissante pour transformer
            votre quotidien
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {!session ? (
              <>
                <Link
                  href="/sign-in"
                  className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Se connecter
                </Link>
                <Link
                  href="#features"
                  className="transform rounded-full border-2 border-gray-300 px-8 py-3 font-medium text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-gray-400"
                >
                  En savoir plus
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Accéder à mon espace
              </Link>
            )}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        >
          <a href="#features" className="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </a>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">
              Des fonctionnalités conçues pour vous
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Une solution complète qui s&apos;adapte parfaitement à vos besoins
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Simple et intuitif",
                description:
                  "Une interface utilisateur pensée pour une prise en main immédiate.",
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
              {
                title: "Sécurité renforcée",
                description:
                  "Vos données sont protégées avec les technologies les plus avancées.",
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
                title: "Toujours disponible",
                description:
                  "Accédez à votre espace depuis n'importe quel appareil, à tout moment.",
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
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-gray-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="mb-6 text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Prêt à commencer l&apos;aventure ?
          </motion.h2>

          <motion.p
            className="mb-10 text-xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Rejoignez des milliers d&apos;utilisateurs satisfaits et transformez
            votre expérience dès aujourd&apos;hui
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {!session ? (
              <Link
                href="/sign-in"
                className="transform rounded-full bg-white px-8 py-3 font-medium text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Commencer maintenant
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="transform rounded-full bg-white px-8 py-3 font-medium text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Accéder à mon espace
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 px-4 py-12 text-gray-300 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Mon App</h3>
            <p className="opacity-75">
              Une solution complète pour transformer votre expérience
              utilisateur.
            </p>
          </div>
          <div>
            <h4 className="text-md mb-4 font-medium text-white">
              Liens rapides
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-white"
                >
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  À propos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md mb-4 font-medium text-white">Légal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Conditions d&apos;utilisation
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Mentions légales
                </a>
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
