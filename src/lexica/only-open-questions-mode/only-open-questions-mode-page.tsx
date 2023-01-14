import OnlyOpenQuestionsMode from "./only-open-questions-mode";
import { useNavigate, useParams } from "react-router-dom";
import { Urls } from "app/routing/urls";
import { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import "./only-open-questions-mode-page.scoped.css";

export default function OnlyOpenQuestionsModePage() {
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
        Only Open Questions Mode
      </Typography>
      {showStartButton ? (
        <>
          <Button fullWidth variant="outlined" onClick={() => setShowStartButton(false)} ref={startButtonRef}>
            Start
          </Button>
        </>
      ) : (
        <OnlyOpenQuestionsMode setPaths={setPaths as string} />
      )}
    </>
  );
}
