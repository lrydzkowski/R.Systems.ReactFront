import { Button, Typography } from "@mui/material";
import { Urls } from "app/routing/urls";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FullMode from "./full-mode";
import "./full-mode-page.scoped.css";

export default function FullModePage() {
  const { setPaths } = useParams();
  const navigate = useNavigate();
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    startButtonRef.current?.focus();
  }, []);

  if (!setPaths) {
    navigate(Urls.pages.sets.path);
  }

  return (
    <>
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
    </>
  );
}
