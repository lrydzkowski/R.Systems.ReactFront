import { Button } from "@mui/material";
import { useEffect, useRef } from "react";

export interface IClosedQuestionResultProps {
  onShowNextQuestion: () => void;
  buttonFocusTrigger: number;
  isCorrectAnswer: boolean;
  answer: string;
}

export default function ClosedQuestionResult(props: IClosedQuestionResultProps) {
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    continueButtonRef.current?.focus();
  }, [props.buttonFocusTrigger]);

  return (
    <div className="row">
      <div className="left-col closed-question">
        <Button fullWidth variant="outlined" type="button" onClick={props.onShowNextQuestion} ref={continueButtonRef}>
          Continue
        </Button>
      </div>
      <div className="right-col closed-question">
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
    </div>
  );
}
