import { LoadingSpinner } from "#/components/ui/loading-spinner";

export function RouteLoading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <LoadingSpinner className="text-primary h-10 w-10" />
    </div>
  );
}
