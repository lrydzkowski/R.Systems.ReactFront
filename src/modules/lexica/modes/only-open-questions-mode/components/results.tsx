export interface IResultsProps {
  numberOfCorrectAnswers: number | null;
  numberOfAllQuestionsToAsk: number | null;
}

export default function Results(props: IResultsProps) {
  return (
    <>
      {props.numberOfCorrectAnswers !== null && props.numberOfAllQuestionsToAsk !== null && (
        <div className="row results">
          <p>
            {props.numberOfCorrectAnswers} / {props.numberOfAllQuestionsToAsk}
          </p>
        </div>
      )}
    </>
  );
}
