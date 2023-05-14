import { Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export interface IOpenQuestionAnserProps {
  onSubmit: () => void;
  handleChange: (value: string) => void;
  givenAnswer: string;
  possibleAnswers: string[];
  isAnswerFormDisabled: boolean;
  inputFocusTrigger: number;
}

export default function OpenQuestionAnswer(props: IOpenQuestionAnserProps) {
  const answerFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    answerFieldRef.current?.focus();
  }, [props.inputFocusTrigger]);

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    props.onSubmit();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.handleChange(event.target.value);
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="row answer-field-row">
        <div className="left-col">
          <div className="answerField">
            <TextField
              fullWidth
              variant="standard"
              value={props.givenAnswer}
              onChange={handleChange}
              disabled={props.isAnswerFormDisabled}
              inputRef={answerFieldRef}
              spellCheck={false}
            />
          </div>
        </div>
        <div className="right-col">
          <Button fullWidth variant="outlined" type="submit" disabled={props.isAnswerFormDisabled}>
            Answer
          </Button>
        </div>
      </div>
    </form>
  );
}
