import { urls } from "app/routing/urls";
import { useNavigate, useParams } from "react-router-dom";

export default function SpellingModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(urls.pages.sets);
  }

  return <p>{setPaths}</p>;
}
