import { useNavigate, useParams } from "react-router-dom";

export default function SpellingModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate("/lexica/sets");
  }

  return <p>{setPaths}</p>;
}
