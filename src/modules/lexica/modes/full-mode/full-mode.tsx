import { useEffect, useState } from "react";
import { useProtectedMultipleData } from "@app/hooks/use-protected-data";
import useRecordingsApi from "@lexica/api/use-recordings-api";
import useSetsApi from "@lexica/api/use-sets-api";
import { Entry } from "@lexica/models/entry";
import { Question } from "@lexica/models/question";
import { QuestionAbout } from "@lexica/models/question-about";
import { QuestionType } from "@lexica/models/question-type";
import { Set } from "@lexica/models/set";
import { playRecordings } from "@lexica/services/play-recordings";
import ClosedQuestionAnswer from "./components/closed-question-answer";
import ClosedQuestionResult from "./components/closed-question-result";
import OpenQuestionAnswer from "./components/open-question-answer";
import OpenQuestionResult from "./components/open-question-result";
import QuestionComponent from "./components/question-component";
import Results from "./components/results";
import Summary from "./components/summary";
import { FullModeService } from "./full-mode-service";
import "./full-mode.css";

interface IFullModeProps {
  setIds: number[];
}

interface IModeState {
  currentQuestion: Question | null;
  numberOfCorrectAnswers: number | null;
  numberOfAllQuestionsToAsk: number | null;
  givenAnswer: string;
  isCorrectAnswer: boolean | null;
  isFinished: boolean;
  questionIndex: number;
}

export default function FullMode(props: IFullModeProps) {
  const { getSetAsync } = useSetsApi();
  const { getRecordingsAsync } = useRecordingsApi();
  const [error, setError] = useState<string>("");
  const [service, setService] = useState<FullModeService | null>(null);
  const [modeState, setModeState] = useState<IModeState>({
    currentQuestion: null,
    numberOfCorrectAnswers: null,
    numberOfAllQuestionsToAsk: null,
    givenAnswer: "",
    isCorrectAnswer: null,
    isFinished: false,
    questionIndex: 0,
  });
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [submitButtonFocusTrigger, setSubmitButtonFocusTrigger] = useState(0);
  const [inputFocusTrigger, setInputFocusTrigger] = useState(0);
  const [continueButtonFocusTrigger, setContinueButtonFocusTrigger] = useState(0);
  const setData = useProtectedMultipleData<Set>(
    props.setIds.map((setId) => ({
      getDataFunc: getSetAsync,
      urlParameters: { setId: setId.toString() },
      requestParameters: {},
    })),
    refreshKey,
    () => {
      setError("An unexpected error has occurred in getting sets.");
    }
  );

  const currentQuestionIndex = modeState.questionIndex;

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardAnswer);

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyboardAnswer);
    };
  }, [currentQuestionIndex]);

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
    setModeState({
      ...modeState,
      currentQuestion: service.getNextQuestion(),
      numberOfCorrectAnswers: service.getNumberOfCorrectAnswers(),
      numberOfAllQuestionsToAsk: service.getNumberOfAllQuestionsToAsk(),
      questionIndex: modeState.questionIndex + 1,
    });
  }, [setData.data]);

  useEffect(() => {
    if (modeState.currentQuestion === null) {
      return;
    }

    if (modeState.currentQuestion.getQuestionType() === QuestionType.Closed) {
      setSubmitButtonFocusTrigger((x) => 1 - x);
    }

    if (modeState.currentQuestion.getQuestionType() === QuestionType.Open) {
      setInputFocusTrigger((x) => 1 - x);
    }

    const abortController = new AbortController();
    if (modeState.currentQuestion.getQuestionAbout() === QuestionAbout.Translations) {
      getRecordingsAsync(modeState.currentQuestion.getQuestions())
        .then((recordings) => {
          playRecordings(recordings, abortController);
        })
        .catch(console.log);
    }

    return () => {
      abortController.abort();

      return;
    };
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (modeState.isCorrectAnswer === null) {
      return;
    }

    setContinueButtonFocusTrigger((x) => 1 - x);

    const abortController = new AbortController();
    if (modeState.currentQuestion?.getQuestionAbout() === QuestionAbout.Words) {
      getRecordingsAsync(modeState.currentQuestion.getAnswers())
        .then((recordings) => {
          playRecordings(recordings, abortController);
        })
        .catch(console.log);
    }

    return () => {
      abortController.abort();

      return;
    };
  }, [modeState.isCorrectAnswer]);

  const handleChange = (value: string): void => {
    setModeState({
      ...modeState,
      givenAnswer: value,
    });
  };

  const handleKeyboardAnswer = (event: KeyboardEvent): void => {
    if (modeState.currentQuestion?.getQuestionType() !== QuestionType.Closed) {
      return;
    }

    const possibleAnswers = modeState.currentQuestion.getPossibleAnswers();
    for (let index = 1; index <= possibleAnswers.length; index++) {
      if (event.key !== index.toString()) {
        continue;
      }

      const givenAnswer = possibleAnswers[index - 1];
      setModeState({
        ...modeState,
        givenAnswer,
      });
      break;
    }
  };

  const handleAnswer = () => {
    if (service === null || modeState.currentQuestion === null) {
      return;
    }

    const isCorrectAnswer = service.verifyAnswer(modeState.currentQuestion, modeState.givenAnswer);
    setModeState({
      ...modeState,
      isCorrectAnswer: isCorrectAnswer as boolean,
      numberOfCorrectAnswers: service.getNumberOfCorrectAnswers(),
    });
  };

  const isAnswerFormDisabled = (): boolean => {
    return modeState.isCorrectAnswer !== null;
  };

  const showNextQuestion = (): void => {
    const nextQuestion = service?.getNextQuestion();
    if (nextQuestion === null) {
      setModeState({
        ...modeState,
        currentQuestion: null,
        isCorrectAnswer: null,
        isFinished: true,
        questionIndex: 0,
      });

      return;
    }

    setModeState({
      ...modeState,
      currentQuestion: nextQuestion as Question,
      givenAnswer: "",
      isCorrectAnswer: null,
      questionIndex: modeState.questionIndex + 1,
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
        <div className="full-mode--container">
          {error.length > 0 && <p className="error">{error}</p>}
          {modeState.currentQuestion !== null && (
            <>
              <Results
                numberOfCorrectAnswers={modeState.numberOfCorrectAnswers}
                numberOfAllQuestionsToAsk={modeState.numberOfAllQuestionsToAsk}
              />
              <QuestionComponent question={modeState.currentQuestion.getQuestion()} />
              {modeState.currentQuestion.getQuestionType() === QuestionType.Closed && (
                <ClosedQuestionAnswer
                  onSubmit={handleAnswer}
                  handleChange={handleChange}
                  givenAnswer={modeState.givenAnswer}
                  possibleAnswers={modeState.currentQuestion.getPossibleAnswers()}
                  isAnswerFormDisabled={isAnswerFormDisabled()}
                  submitButtonFocusTrigger={submitButtonFocusTrigger}
                />
              )}
              {modeState.currentQuestion.getQuestionType() === QuestionType.Open && (
                <OpenQuestionAnswer
                  onSubmit={handleAnswer}
                  handleChange={handleChange}
                  givenAnswer={modeState.givenAnswer}
                  possibleAnswers={modeState.currentQuestion.getPossibleAnswers()}
                  isAnswerFormDisabled={isAnswerFormDisabled()}
                  inputFocusTrigger={inputFocusTrigger}
                />
              )}
            </>
          )}
          {modeState.isCorrectAnswer !== null && (
            <>
              {modeState.currentQuestion !== null &&
                modeState.currentQuestion.getQuestionType() === QuestionType.Closed && (
                  <ClosedQuestionResult
                    onShowNextQuestion={showNextQuestion}
                    continueButtonFocusTrigger={continueButtonFocusTrigger}
                    isCorrectAnswer={modeState.isCorrectAnswer}
                    answer={modeState.currentQuestion?.getAnswer()}
                  />
                )}
              {(modeState.currentQuestion === null ||
                modeState.currentQuestion.getQuestionType() === QuestionType.Open) && (
                <OpenQuestionResult
                  isCorrectAnswer={modeState.isCorrectAnswer}
                  answer={modeState.currentQuestion?.getAnswer() ?? ""}
                  onShowNextQuestion={showNextQuestion}
                  continueButtonFocusTrigger={continueButtonFocusTrigger}
                />
              )}
            </>
          )}
          {modeState.isFinished && <Summary onRepeatMode={repeatMode} />}
        </div>
      )}
    </>
  );
}
