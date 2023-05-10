import { Button } from "@mui/material";
import { useEffect, useRef } from "react";

export interface IOpenQuestionResultProps {
  isCorrectAnswer: boolean;
  answer: string;
  onShowNextQuestion: () => void;
  buttonFocusTrigger: number;
}

export default function OpenQuestionResult(props: IOpenQuestionResultProps) {
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    continueButtonRef.current?.focus();
  }, [props.buttonFocusTrigger]);

  return (
    <div className="row">
      <div className="left-col">
        {props.isCorrectAnswer ? (
          <p className="correct-answer">Correct answer</p>
        ) : (
          <>
            <p className="wrong-answer">Wrong answer</p>
            <p>
              Correct answer is: <span className="answer">{props.answer}</span>
            </p>
          </>
        )}
      </div>
      <div className="right-col">
        <Button fullWidth variant="outlined" type="button" onClick={props.onShowNextQuestion} ref={continueButtonRef}>
          Continue
        </Button>
      </div>
    </div>
  );
}
