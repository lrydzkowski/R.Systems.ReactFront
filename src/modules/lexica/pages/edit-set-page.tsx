import { useNavigate, useParams } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";
import EditSet from "@lexica/components/edit-set";

export default function EditSetPage() {
  const { setId } = useParams();
  const navigate = useNavigate();

  if (!setId) {
    navigate(Urls.getPath(Pages.sets));
  }

  const parsedSetId: number = parseInt(setId as string, 10);
  if (isNaN(parsedSetId)) {
    navigate(Urls.getPath(Pages.sets));
  }

  return <EditSet setId={parsedSetId} />;
}
