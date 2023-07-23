import { useNavigate, useParams } from "react-router-dom";
import useUrls, { Pages } from "@app/router/use-urls";
import EditSet from "@lexica/components/edit-set";

export default function EditSetPage() {
  const { getPath } = useUrls();
  const { setId } = useParams();
  const navigate = useNavigate();

  if (!setId) {
    navigate(getPath(Pages.sets));
  }

  const parsedSetId: number = parseInt(setId as string, 10);
  if (isNaN(parsedSetId)) {
    navigate(getPath(Pages.sets));
  }

  return <EditSet setId={parsedSetId} />;
}
