import AppBreadcrumbs from "app/components/app-breadcrumbs";
import Set from "lexica/components/set-details";
import { useNavigate, useParams } from "react-router";
import "./set-page.scoped.css";

export default function SetPage() {
  const { setPath } = useParams();
  const navigate = useNavigate();

  if (!setPath) {
    navigate("/lexica/sets");
  }

  console.log(setPath);

  return (
    <>
      <div className="set-page-content">
        <AppBreadcrumbs />
        <div className="set">
          <Set setPath={setPath as string} />
        </div>
      </div>
    </>
  );
}
