import OnlyOpenQuestionsMode from "./only-open-questions-mode";
import { useNavigate, useParams } from "react-router-dom";

export default function OnlyOpenQuestionsModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate("/lexica/sets");
  }

  return <OnlyOpenQuestionsMode setPaths={setPaths as string} />;
}
