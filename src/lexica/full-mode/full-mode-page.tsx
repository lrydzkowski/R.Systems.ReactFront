import { Urls } from "app/routing/urls";
import { useNavigate, useParams } from "react-router-dom";
import FullMode from "./full-mode";

export default function FullModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(Urls.pages.sets.path);
  }

  return <FullMode setPaths={setPaths as string} />;
}
