import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";
import SpellingMode from "./spelling-mode";
import "./spelling-mode-page.css";

export default function SpellingModePage() {
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
    <div className="spelling-mode--container">
      <Typography variant="subtitle1" component="h2">
        Spelling Mode
      </Typography>
      {showStartButton ? (
        <>
          <Button fullWidth variant="outlined" onClick={() => setShowStartButton(false)} ref={startButtonRef}>
            Start
          </Button>
        </>
      ) : (
        <SpellingMode setPaths={setPaths as string} />
      )}
    </div>
  );
}
