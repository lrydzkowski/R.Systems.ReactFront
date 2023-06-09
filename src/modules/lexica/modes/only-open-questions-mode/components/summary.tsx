import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";

export interface ISummaryProps {
  onRepeatMode: () => void;
}

export default function Summary(props: ISummaryProps) {
  const navigate = useNavigate();

  const redirectToList = (): void => {
    navigate(Urls.getPath(Pages.sets));
  };

  return (
    <div className="summary">
      <p className="the-end">The end!</p>
      <Button variant="outlined" type="button" onClick={props.onRepeatMode}>
        Repeat
      </Button>
      <Button variant="outlined" type="button" onClick={redirectToList}>
        Sets
      </Button>
    </div>
  );
}
