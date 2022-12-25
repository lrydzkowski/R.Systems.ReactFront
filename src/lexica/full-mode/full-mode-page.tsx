import { useNavigate, useParams } from "react-router-dom";

export default function FullModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate("/lexica/sets");
  }

  return <p>{setPaths}</p>;
}
