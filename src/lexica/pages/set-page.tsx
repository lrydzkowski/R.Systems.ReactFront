import Set from "lexica/components/set-details";
import { useNavigate, useParams } from "react-router";
import "./set-page.scoped.css";

export default function SetPage() {
  const { setPaths: setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate("/lexica/sets");
  }

  return (
    <>
      <Set setPaths={setPaths as string} />
    </>
  );
}
