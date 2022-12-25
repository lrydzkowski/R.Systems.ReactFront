import { QuestionAbout } from "./question-about";
import { QuestionType } from "./question-type";

export class QuestionResult {
  private results: { [key: string]: { [key: string]: number } } = {};

  constructor(
    private entryIndex: number,
    private expectedNumOfClosedCorrectAnswers = 1,
    private expectedNumOfOpenCorrectAnswers = 2
  ) {
    this.resetResults(QuestionType.Closed);
    this.resetResults(QuestionType.Open);
  }

  public getEntryIndex(): number {
    return this.entryIndex;
  }

  public isFinished(): boolean {
    if (
      this.results[QuestionType.Closed][QuestionAbout.Words] < this.expectedNumOfClosedCorrectAnswers ||
      this.results[QuestionType.Closed][QuestionAbout.Translations] < this.expectedNumOfClosedCorrectAnswers
    ) {
      return false;
    }

    if (
      this.results[QuestionType.Open][QuestionAbout.Words] < this.expectedNumOfOpenCorrectAnswers ||
      this.results[QuestionType.Open][QuestionAbout.Translations] < this.expectedNumOfOpenCorrectAnswers
    ) {
      return false;
    }

    return true;
  }

  public getAvailableQuestionType(): string {
    if (
      this.results[QuestionType.Closed][QuestionAbout.Words] < this.expectedNumOfClosedCorrectAnswers ||
      this.results[QuestionType.Closed][QuestionAbout.Translations] < this.expectedNumOfClosedCorrectAnswers
    ) {
      return QuestionType.Closed;
    }

    if (
      this.results[QuestionType.Open][QuestionAbout.Words] < this.expectedNumOfOpenCorrectAnswers ||
      this.results[QuestionType.Open][QuestionAbout.Translations] < this.expectedNumOfOpenCorrectAnswers
    ) {
      return QuestionType.Open;
    }

    return "";
  }

  public getAvailableQuestionAbouts(questionType: string): string[] {
    const availableQuestionAbouts: string[] = [];
    if (this.results[questionType][QuestionAbout.Words] < this.expectedNumOfClosedCorrectAnswers) {
      availableQuestionAbouts.push(QuestionAbout.Words);
    }

    if (this.results[questionType][QuestionAbout.Translations] < this.expectedNumOfClosedCorrectAnswers) {
      availableQuestionAbouts.push(QuestionAbout.Translations);
    }

    return availableQuestionAbouts;
  }

  public updateResult(questionType: string, questionAbout: string, isAnswerCorrect: boolean): number {
    if (isAnswerCorrect) {
      this.results[questionType][questionAbout]++;

      return 1;
    } else {
      const currectResult = this.sumUpResults(questionType);
      this.resetResults(questionType);

      return -currectResult;
    }
  }

  private resetResults(questionType: string): void {
    this.results[questionType] = {
      [QuestionAbout.Words]: 0,
      [QuestionAbout.Translations]: 0,
    };
  }

  private sumUpResults(questionType: string): number {
    return this.results[questionType][QuestionAbout.Words] + this.results[questionType][QuestionAbout.Translations];
  }
}
