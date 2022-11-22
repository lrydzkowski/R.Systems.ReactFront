import Set from "lexica/components/set-details";
import { useNavigate, useParams } from "react-router";
import "./set-page.scoped.css";

export default function SetPage() {
  const { setPath } = useParams();
  const navigate = useNavigate();

  if (!setPath) {
    navigate("/lexica/sets");
  }

  console.log(setPath);

  return (
    <>
      <Set setPath={setPath as string} />
    </>
  );
}
