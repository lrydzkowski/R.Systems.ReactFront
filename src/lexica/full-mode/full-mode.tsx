import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedData from "auth/hooks/use-protected-data";
import { getSets } from "lexica/common/api/sets-api";
import { Entry } from "lexica/common/models/entry";
import { Set } from "lexica/common/models/set";
import { Question } from "./models/question";
import { FullModeService } from "./full-mode-service";
import "./full-mode.scoped.css";
import { QuestionType } from "./models/question-type";

interface IFullModeProps {
  setPaths: string;
}

export default function FullMode(props: IFullModeProps) {
  const [error, setError] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [service, setService] = useState<FullModeService | null>(null);
  const [givenAnswer, setGivenAnswer] = useState<string>("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number | null>(null);
  const [numberOfAllQuestionsToAsk, setNumberOfAllQuestionsToAsk] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const answerFieldRef = useRef<HTMLInputElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const setData = useProtectedData<Set[]>(getSets, [props.setPaths], refreshKey, () => {
    setError("An unexpected error has occurred in getting sets.");
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (setData.data === null) {
      return;
    }

    const entries: Entry[] = [];
    for (const set of setData.data) {
      entries.push(...set.entries);
    }

    const service = new FullModeService(entries);
    setService(service);
    setCurrentQuestion(service.getNextQuestion());
    setNumberOfCorrectAnswers(service.getNumberOfCorrectAnswers());
    setNumberOfAllQuestionsToAsk(service.getNumberOfAllQuestionsToAsk());
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
    if (service === null || currentQuestion === null) {
      return;
    }

    const isCorrectAnswer = service?.verifyAnswer(currentQuestion, givenAnswer);
    setIsCorrectAnswer(isCorrectAnswer as boolean);
    setNumberOfCorrectAnswers(service.getNumberOfCorrectAnswers());
  };

  const isAnswerFormDisabled = (): boolean => {
    return isCorrectAnswer !== null;
  };

  const showNextQuestion = (): void => {
    const nextQuestion = service?.getNextQuestion();
    if (nextQuestion === null) {
      setCurrentQuestion(null);
      setIsCorrectAnswer(null);
      setIsFinished(true);

      return;
    }

    setCurrentQuestion(nextQuestion as Question);
    setGivenAnswer("");
    setIsCorrectAnswer(null);
  };

  const repeatMode = (): void => {
    setRefreshKey((x) => x + 1);
    setGivenAnswer("");
    setIsCorrectAnswer(null);
    setIsFinished(false);
  };

  const redirectToList = (): void => {
    navigate("/lexica/sets");
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
              <div className="row results">
                <p>
                  {numberOfCorrectAnswers} / {numberOfAllQuestionsToAsk}
                </p>
              </div>
              <div className="row">
                <p className="question">{currentQuestion.getQuestion()}</p>
              </div>
              {currentQuestion.getQuestionType() === QuestionType.Closed && <p>Closed</p>}
              {currentQuestion.getQuestionType() === QuestionType.Open && (
                <div className="row answer-field-row">
                  <div className="left-col">
                    <div className="answerField">
                      <TextField
                        fullWidth
                        variant="standard"
                        value={givenAnswer}
                        onChange={handleChange}
                        disabled={isAnswerFormDisabled()}
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
              )}
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
                      Correct answer is: <span className="answer">{currentQuestion?.getAnswer()}</span>
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
          {isFinished && (
            <div className="summary">
              <p className="the-end">The end!</p>
              <Button type="button" onClick={repeatMode}>
                Repeat
              </Button>
              <Button type="button" onClick={redirectToList}>
                Sets
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
