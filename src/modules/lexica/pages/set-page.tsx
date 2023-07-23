import { useNavigate, useParams } from "react-router";
import useUrls, { Pages } from "@app/router/use-urls";
import SetDetails from "@lexica/components/set-details";
import { splitIds } from "@lexica/services/ids-parser";

export default function SetPage() {
  const { getPath } = useUrls();
  const { setIds } = useParams();
  const navigate = useNavigate();

  if (!setIds) {
    navigate(getPath(Pages.sets));
  }

  return (
    <>
      <SetDetails setIds={splitIds(setIds as string)} />
    </>
  );
}
