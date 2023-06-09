export interface IResultsProps {
  numberOfCorrectAnswers: number | null;
  numberOfAllQuestionsToAsk: number | null;
  isPronunciationLoading: boolean;
}

export default function Results(props: IResultsProps) {
  return (
    <>
      {props.numberOfCorrectAnswers !== null && props.numberOfAllQuestionsToAsk !== null && (
        <div className="row results">
          <p className="statistics">
            {props.numberOfCorrectAnswers} / {props.numberOfAllQuestionsToAsk}
          </p>
          {props.isPronunciationLoading && <p>Loading...</p>}
        </div>
      )}
    </>
  );
}
