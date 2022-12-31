import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedData from "app/hooks/use-protected-data";
import { getSetsContent } from "lexica/common/api/sets-api";
import { Entry } from "lexica/common/models/entry";
import { Set } from "lexica/common/models/set";
import { OpenQuestion } from "./models/open-question";
import { OnlyOpenQuestionsModeService } from "./only-open-questions-mode-service";
import "./only-open-questions-mode.scoped.css";
import { Urls } from "app/routing/urls";
import { QuestionAbout } from "./models/question-about";
import playRecord from "lexica/common/services/play-record";

interface IOnlyOpenQuestionsModeProps {
  setPaths: string;
}

export default function OnlyOpenQuestionsMode(props: IOnlyOpenQuestionsModeProps) {
  const [error, setError] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<OpenQuestion | null>(null);
  const [service, setService] = useState<OnlyOpenQuestionsModeService | null>(null);
  const [givenAnswer, setGivenAnswer] = useState<string>("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number | null>(null);
  const [numberOfAllQuestionsToAsk, setNumberOfAllQuestionsToAsk] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const answerFieldRef = useRef<HTMLInputElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const setData = useProtectedData<Set[]>(getSetsContent, { paths: props.setPaths }, refreshKey, () => {
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

    const service = new OnlyOpenQuestionsModeService(entries);
    setService(service);
    setCurrentQuestion(service.getNextQuestion());
    setNumberOfCorrectAnswers(service.getNumberOfCorrectAnswers());
    setNumberOfAllQuestionsToAsk(service.getNumberOfAllQuestionsToAsk());
  }, [setData.data]);

  useEffect(() => {
    answerFieldRef.current?.focus();

    if (currentQuestion?.getQuestionAbout() === QuestionAbout.Translations) {
      playRecord(currentQuestion.getQuestion());
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (isCorrectAnswer === null) {
      return;
    }

    continueButtonRef.current?.focus();

    if (currentQuestion?.getQuestionAbout() === QuestionAbout.Words) {
      playRecord(currentQuestion.getAnswer());
    }
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

    setCurrentQuestion(nextQuestion as OpenQuestion);
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
    navigate(Urls.pages.sets.path);
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
