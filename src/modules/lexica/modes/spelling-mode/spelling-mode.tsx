import { useEffect, useState } from "react";
import useProtectedData from "@app/hooks/use-protected-data";
import { getSetsContent } from "@lexica/api/sets-api";
import { Entry } from "@lexica/models/entry";
import { Question } from "@lexica/models/question";
import { Set } from "@lexica/models/set";
import getRecordings from "@lexica/services/get-recordings";
import { decodePaths } from "@lexica/services/paths-encoder";
import { playRecordings } from "@lexica/services/play-recordings";
import OpenQuestionAnswer from "./components/open-question-answer";
import OpenQuestionResult from "./components/open-question-result";
import Results from "./components/results";
import Summary from "./components/summary";
import { SpellingModeService } from "./spelling-mode-service";
import "./spelling-mode.css";

interface ISpellingModeProps {
  setPaths: string;
}

interface IModeState {
  currentQuestion: Question | null;
  numberOfCorrectAnswers: number | null;
  numberOfAllQuestionsToAsk: number | null;
  givenAnswer: string;
  isCorrectAnswer: boolean | null;
  isFinished: boolean;
}

export default function SpellingMode(props: ISpellingModeProps) {
  const [isPronunciationLoading, setIsPronunciationLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [service, setService] = useState<SpellingModeService | null>(null);
  const [modeState, setModeState] = useState<IModeState>({
    currentQuestion: null,
    numberOfCorrectAnswers: null,
    numberOfAllQuestionsToAsk: null,
    givenAnswer: "",
    isCorrectAnswer: null,
    isFinished: false,
  });
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [inputFocusTrigger, setInputFocusTrigger] = useState(0);
  const [continueButtonFocusTrigger, setContinueButtonFocusTrigger] = useState(0);
  const setData = useProtectedData<Set[]>(
    getSetsContent,
    {},
    { setPath: decodePaths(props.setPaths) },
    refreshKey,
    () => {
      setError("An unexpected error has occurred in getting sets.");
    }
  );

  const currentQuestionValue = modeState.currentQuestion?.getQuestion();

  useEffect(() => {
    if (setData.data === null) {
      return;
    }

    const entries: Entry[] = [];
    for (const set of setData.data) {
      entries.push(...set.entries);
    }

    const service = new SpellingModeService(entries);
    setService(service);
    setModeState({
      ...modeState,
      currentQuestion: service.getNextQuestion(),
      numberOfCorrectAnswers: service.getNumberOfCorrectAnswers(),
      numberOfAllQuestionsToAsk: service.getNumberOfAllQuestionsToAsk(),
    });
  }, [setData.data]);

  useEffect(() => {
    setInputFocusTrigger((x) => 1 - x);

    if (modeState.currentQuestion === null || service === null) {
      return;
    }

    const abortController = new AbortController();

    setIsPronunciationLoading(true);
    getRecordings(modeState.currentQuestion.getAnswers())
      .then((recordings) => {
        setIsPronunciationLoading(false);
        if (recordings.length === 0) {
          service?.verifyAnswer(modeState.currentQuestion!, modeState.currentQuestion!.getAnswer());
          setModeState({
            ...modeState,
            numberOfCorrectAnswers: service.getNumberOfCorrectAnswers(),
          });
          showNextQuestion();

          return;
        }

        playRecordings(recordings, abortController);
      })
      .catch(console.log);

    return () => {
      abortController.abort();

      return;
    };
  }, [currentQuestionValue]);

  useEffect(() => {
    setInputFocusTrigger((x) => 1 - x);
  }, [isPronunciationLoading]);

  useEffect(() => {
    if (modeState.isCorrectAnswer === null) {
      return;
    }

    setContinueButtonFocusTrigger((x) => 1 - x);
  }, [modeState.isCorrectAnswer]);

  const handleChange = (value: string): void => {
    setModeState({
      ...modeState,
      givenAnswer: value,
    });
  };

  const handleAnswer = () => {
    if (service === null || modeState.currentQuestion === null) {
      return;
    }

    const isCorrectAnswer = service?.verifyAnswer(modeState.currentQuestion, modeState.givenAnswer);
    setModeState({
      ...modeState,
      isCorrectAnswer: isCorrectAnswer as boolean,
      numberOfCorrectAnswers: service.getNumberOfCorrectAnswers(),
    });
  };

  const isAnswerFormDisabled = (): boolean => {
    return modeState.isCorrectAnswer !== null || isPronunciationLoading;
  };

  const showNextQuestion = (): void => {
    const nextQuestion = service?.getNextQuestion();
    if (nextQuestion === null) {
      setModeState({
        ...modeState,
        currentQuestion: null,
        isCorrectAnswer: null,
        isFinished: true,
      });

      return;
    }

    setModeState({
      ...modeState,
      currentQuestion: nextQuestion as Question,
      givenAnswer: "",
      isCorrectAnswer: null,
    });
  };

  const repeatMode = (): void => {
    setRefreshKey((x) => 1 - x);

    setModeState({
      ...modeState,
      givenAnswer: "",
      isCorrectAnswer: null,
      isFinished: false,
    });
  };

  return (
    <>
      {setData.processing ? (
        <p>Loading...</p>
      ) : (
        <div className="spelling-mode--container">
          {error.length > 0 && <p className="error">{error}</p>}
          {modeState.currentQuestion !== null && (
            <>
              <Results
                numberOfCorrectAnswers={modeState.numberOfCorrectAnswers}
                numberOfAllQuestionsToAsk={modeState.numberOfAllQuestionsToAsk}
                isPronunciationLoading={isPronunciationLoading}
              />
              <OpenQuestionAnswer
                onSubmit={handleAnswer}
                handleChange={handleChange}
                givenAnswer={modeState.givenAnswer}
                possibleAnswers={modeState.currentQuestion.getPossibleAnswers()}
                isAnswerFormDisabled={isAnswerFormDisabled()}
                inputFocusTrigger={inputFocusTrigger}
              />
            </>
          )}
          {modeState.isCorrectAnswer !== null && (
            <OpenQuestionResult
              isCorrectAnswer={modeState.isCorrectAnswer}
              answer={modeState.currentQuestion?.getAnswer() ?? ""}
              onShowNextQuestion={showNextQuestion}
              continueButtonFocusTrigger={continueButtonFocusTrigger}
            />
          )}
          {modeState.isFinished && <Summary onRepeatMode={repeatMode} />}
        </div>
      )}
    </>
  );
}
