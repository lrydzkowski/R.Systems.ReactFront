import { Urls } from "app/routing/urls";
import { useNavigate, useParams } from "react-router-dom";
import SpellingMode from "./spelling-mode";

export default function SpellingModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(Urls.pages.sets.path);
  }

  return <SpellingMode setPaths={setPaths as string} />;
}
