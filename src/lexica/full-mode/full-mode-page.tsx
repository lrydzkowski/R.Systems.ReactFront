import { useNavigate, useParams } from "react-router-dom";
import FullMode from "./full-mode";

export default function FullModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate("/lexica/sets");
  }

  return <FullMode setPaths={setPaths as string} />;
}
