import AppBreadcrumbs from "app/components/app-breadcrumbs";
import useProtectedData from "auth/hooks/use-protected-data";
import { getSets } from "lexica/api/sets-api";
import { Set } from "lexica/models/set";

export default function SetsPage() {
  const setsData = useProtectedData<Set[]>(getSets);

  return (
    <>
      <AppBreadcrumbs />
      <p>Sets page</p>
      {setsData.processing && <p>Loading...</p>}
      {setsData.data?.map((set) => (
        <p key={set.path}>{set.path}</p>
      ))}
    </>
  );
}
