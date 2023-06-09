export interface IQuestionComponentProps {
  question: string;
}

export default function QuestionComponent(props: IQuestionComponentProps) {
  return (
    <div className="row">
      <p className="question">{props.question}</p>
    </div>
  );
}
