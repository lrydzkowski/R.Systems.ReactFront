import { useNavigate, useParams } from "react-router";
import { Pages, Urls } from "@app/router/urls";
import SetDetails from "@lexica/components/set-details";
import { splitIds } from "@lexica/services/ids-parser";

export default function SetPage() {
  const { setIds } = useParams();
  const navigate = useNavigate();

  if (!setIds) {
    navigate(Urls.getPath(Pages.sets));
  }

  return (
    <>
      <SetDetails setIds={splitIds(setIds as string)} />
    </>
  );
}
