import { useNavigate, useParams } from "react-router";
import { Pages, Urls } from "@app/router/urls";
import SetDetails from "@lexica/components/set-details";

export default function SetPage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();

  if (!setPaths) {
    navigate(Urls.getPath(Pages.sets));
  }

  return (
    <>
      <SetDetails setPaths={setPaths as string} />
    </>
  );
}
