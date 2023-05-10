import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useRef } from "react";

export interface IClosedQuestionAnswerProps {
  onSubmit: () => void;
  handleChange: (value: string) => void;
  givenAnswer: string;
  possibleAnswers: string[];
  isAnswerFormDisabled: boolean;
  submitButtonFocusTrigger: number;
}

export default function ClosedQuestionAnswer(props: IClosedQuestionAnswerProps) {
  const answerClosedQuestionButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    answerClosedQuestionButtonRef.current?.focus();
  }, [props.submitButtonFocusTrigger]);

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    props.onSubmit();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.handleChange(event.target.value);
  };

  return (
    <div>
      <form className="closed-question-form" onSubmit={onSubmit} autoComplete="off">
        <div className="row">
          <RadioGroup
            name="radio-buttons-group"
            className="radio-buttons"
            onChange={handleChange}
            value={props.givenAnswer}
          >
            {props.possibleAnswers.map((possibleAnswer, index) => (
              <FormControlLabel
                key={index}
                value={possibleAnswer}
                control={<Radio />}
                label={possibleAnswer}
                disabled={props.isAnswerFormDisabled}
              />
            ))}
          </RadioGroup>
        </div>
        <div className="row">
          <Button
            variant="outlined"
            type="submit"
            disabled={props.isAnswerFormDisabled}
            ref={answerClosedQuestionButtonRef}
          >
            Answer
          </Button>
        </div>
      </form>
    </div>
  );
}
