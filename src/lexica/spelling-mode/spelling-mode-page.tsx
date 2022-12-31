import { Urls } from "app/routing/urls";
import { useNavigate, useParams } from "react-router-dom";

export default function SpellingModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(Urls.pages.sets.path);
  }

  return <p>{setPaths}</p>;
}
