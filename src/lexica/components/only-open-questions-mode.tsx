import { Button, TextField } from "@mui/material";
import useProtectedData from "auth/hooks/use-protected-data";
import { getSets } from "lexica/api/sets-api";
import { OpenQuestion } from "lexica/models/open-question";
import { Set } from "lexica/models/set";
import { OnlyOpenQuestionsModeService } from "lexica/services/only-open-questions-mode-service";
import React, { useEffect, useRef, useState } from "react";
import "./only-open-questions-mode.scoped.css";

interface IOnlyOpenQuestionsModeProps {
  setPaths: string;
}

export default function OnlyOpenQuestionsMode(props: IOnlyOpenQuestionsModeProps) {
  const [error, setError] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<OpenQuestion | null>(null);
  const [service, setService] = useState<OnlyOpenQuestionsModeService | null>(null);
  const [givenAnswer, setGivenAnswer] = useState<string>("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const answerFieldRef = useRef<HTMLInputElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const setData = useProtectedData<Set[]>(getSets, [props.setPaths], 0, () => {
    setError("An unexpected error has occurred in getting sets.");
  });

  useEffect(() => {
    if (setData.data === null) {
      return;
    }

    const service = new OnlyOpenQuestionsModeService(setData.data[0].entries);
    setService(service);
    setCurrentQuestion(service.getNextQuestion());
  }, [setData.data]);

  useEffect(() => {
    answerFieldRef.current?.focus();
  }, [currentQuestion]);

  useEffect(() => {
    if (isCorrectAnswer === null) {
      return;
    }

    continueButtonRef.current?.focus();
  }, [isCorrectAnswer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setGivenAnswer(event.target.value);
  };

  const handleAnswer = (event: React.FormEvent) => {
    event.preventDefault();
    const isCorrectAnswer = currentQuestion?.isAnswerCorrect(givenAnswer);
    setIsCorrectAnswer(isCorrectAnswer as boolean);
  };

  const isAnswerFormDisabled = (): boolean => {
    return isCorrectAnswer !== null;
  };

  const showNextQuestion = (): void => {
    const nextQuestion = service?.getNextQuestion();
    if (nextQuestion === null) {
      return;
    }

    setCurrentQuestion(nextQuestion as OpenQuestion);
    setGivenAnswer("");
    setIsCorrectAnswer(null);
    setStepNumber((x) => x + 1);
  };

  return (
    <>
      {setData.processing ? (
        <p>Loading...</p>
      ) : (
        <div className="mode-container">
          {error.length > 0 && <p className="error">{error}</p>}
          {currentQuestion !== null && (
            <form onSubmit={handleAnswer}>
              <div className="row">
                <p className="question">{currentQuestion.question}</p>
              </div>
              <div className="row answer-field-row">
                <div className="left-col">
                  <div className="answerField">
                    <TextField
                      fullWidth
                      variant="standard"
                      value={givenAnswer}
                      onChange={handleChange}
                      disabled={isAnswerFormDisabled()}
                      // onKeyDown={handleKeyDown}
                      inputRef={answerFieldRef}
                    />
                  </div>
                </div>
                <div className="right-col">
                  <Button fullWidth variant="outlined" type="submit" disabled={isAnswerFormDisabled()}>
                    Answer
                  </Button>
                </div>
              </div>
            </form>
          )}
          {isCorrectAnswer !== null && (
            <div className="row">
              <div className="left-col">
                {isCorrectAnswer ? (
                  <p className="correct-answer">Correct answer</p>
                ) : (
                  <>
                    <p className="wrong-answer">Wrong answer</p>
                    <p>
                      Correct answer is: <span className="answer">{currentQuestion?.answer}</span>
                    </p>
                  </>
                )}
              </div>
              <div className="right-col">
                <Button fullWidth variant="outlined" type="button" onClick={showNextQuestion} ref={continueButtonRef}>
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
