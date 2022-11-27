import Set from "lexica/components/set-details";
import { useNavigate, useParams } from "react-router";

export default function SetPage() {
  const { setPaths } = useParams();
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
