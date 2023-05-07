import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";
import FullMode from "./full-mode";
import "./full-mode-page.css";

export default function FullModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    startButtonRef.current?.focus();
  }, []);

  if (!setPaths) {
    navigate(Urls.getPath(Pages.sets));
  }

  return (
    <div className="full-mode-page--container">
      <Typography variant="subtitle1" component="h2">
        Full Mode
      </Typography>
      {showStartButton ? (
        <>
          <Button fullWidth variant="outlined" onClick={() => setShowStartButton(false)} ref={startButtonRef}>
            Start
          </Button>
        </>
      ) : (
        <FullMode setPaths={setPaths as string} />
      )}
    </div>
  );
}
