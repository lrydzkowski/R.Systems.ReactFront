import OnlyOpenQuestionsMode from "./only-open-questions-mode";
import { useNavigate, useParams } from "react-router-dom";
import { Urls } from "app/routing/urls";

export default function OnlyOpenQuestionsModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(Urls.pages.sets.path);
  }

  return <OnlyOpenQuestionsMode setPaths={setPaths as string} />;
}
