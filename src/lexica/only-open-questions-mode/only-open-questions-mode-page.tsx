import OnlyOpenQuestionsMode from "./only-open-questions-mode";
import { useNavigate, useParams } from "react-router-dom";
import { urls } from "app/routing/urls";

export default function OnlyOpenQuestionsModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(urls.pages.sets);
  }

  return <OnlyOpenQuestionsMode setPaths={setPaths as string} />;
}
