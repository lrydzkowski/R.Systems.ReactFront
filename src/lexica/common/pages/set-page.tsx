import { urls } from "app/routing/urls";
import Set from "lexica/common/components/set-details";
import { useNavigate, useParams } from "react-router";

export default function SetPage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(urls.pages.sets);
  }

  return (
    <>
      <Set setPaths={setPaths as string} />
    </>
  );
}
