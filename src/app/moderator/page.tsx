import WithRole from "#/components/auth/WithRole";

export default function ModeratorPage() {
  return (
    <WithRole allowedRoles={["moderator", "admin"]}>
      <div className="container mx-auto py-10">
        <h1 className="mb-6 text-3xl font-bold">Panneau de Modération</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Contenu à Modérer</h2>
            <p className="text-muted-foreground mb-4">
              Consultez et gérez les contenus signalés par les utilisateurs.
            </p>
            <div className="bg-muted rounded-md p-4 text-center">
              Aucun contenu en attente de modération
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Activité Récente</h2>
            <p className="text-muted-foreground mb-4">
              Suivez l'activité récente de modération.
            </p>
            <div className="bg-muted rounded-md p-4 text-center">
              Aucune activité récente
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
}
