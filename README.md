# Plan d'implémentation pour projet IAM avec NextJS
## Phase 1: Configuration de l'environnement
1. [x] Initialiser un nouveau projet NextJS (pnpm create t3-app@latest)
2. [x] Configurer Tailwind CSS
3. [x] Mettre en place Docker et PostgreSQL
4. [x] Configurer Drizzle ORM pour la connexion à la base de données
5. [x] Configurer Pino pour le système de logging
6. [x] Installer Better-Auth pour la gestion de l'authentification
7. [x] Installer React Hook Form pour les formulaires
8. [x] Installer ChartJS pour les visualisations
9. [ ] deployer l'application sur vercel

## Phase 2: Structure de la base de données
1. [ ] Créer les schémas Drizzle pour les utilisateurs
2. [ ] Créer les schémas pour les rôles et permissions
3. [ ] Créer le schéma pour les logs d'authentification et d'accès
4. [ ] Configurer les migrations Drizzle
5. [ ] Exécuter la migration initiale

## Phase 3: Système d'authentification
1. [ ] Configurer l'authentification par email et mot de passe
2. [ ] Configurer l'authentification par OAuth (Google, GitHub)
3. [ ] Configurer l'authentification par JWT

## Phase 4: Système de logging essentiel
1. [ ] Middleware simple pour capturer les événements principaux
   - [ ] Configurer Pino pour la journalisation
   - [ ] Creer un middleware pour la journalisation
2. [ ] Enregistrer les logs dans PostgreSQL

## Phase 5: Interface minimale
1. [ ] Créer une page de connexion
2. [ ] Créer une page d'inscription
3. [ ] Créer un Dashboard simple pour visualiser les logs
4. [ ] Créer une page protégée par rôle (admin vs utilisateur)

## Phase 6:  Documentation (1h)
1. [ ] Documenter l'architecture du projet
2. [ ] Documenter les API
3. [ ] Documenter les schémas de la base de données
4. [ ] Documenter le système de logging
5. [ ] Documenter le système d'authentification
6. [ ] Documenter le système de gestion des rôles et permissions