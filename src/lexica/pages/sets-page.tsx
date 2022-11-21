import AppBreadcrumbs from "app/components/app-breadcrumbs";
import SetsList from "lexica/components/sets-list";
import "./sets-page.scoped.css";

export default function SetsPage() {
  return (
    <div className="sets-page-content">
      <AppBreadcrumbs />
      <div className="sets-list">
        <SetsList />
      </div>
    </div>
  );
}
