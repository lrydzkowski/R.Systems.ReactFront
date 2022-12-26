import { QuestionAbout } from "./question-about";
import { QuestionType } from "./question-type";

export class QuestionResult {
  private results: { [key: string]: { [key: string]: number } } = {};

  constructor(
    private entryIndex: number,
    private expectedCorrectAnswers = {
      [QuestionType.Closed]: 1,
      [QuestionType.Open]: 2,
    }
  ) {
    this.resetResults(QuestionType.Closed);
    this.resetResults(QuestionType.Open);
  }

  public getEntryIndex(): number {
    return this.entryIndex;
  }

  public isFinished(): boolean {
    if (
      this.results[QuestionType.Closed][QuestionAbout.Words] < this.expectedCorrectAnswers[QuestionType.Closed] ||
      this.results[QuestionType.Closed][QuestionAbout.Translations] < this.expectedCorrectAnswers[QuestionType.Closed]
    ) {
      return false;
    }

    if (
      this.results[QuestionType.Open][QuestionAbout.Words] < this.expectedCorrectAnswers[QuestionType.Open] ||
      this.results[QuestionType.Open][QuestionAbout.Translations] < this.expectedCorrectAnswers[QuestionType.Open]
    ) {
      return false;
    }

    return true;
  }

  public getAvailableQuestionType(): string {
    if (
      this.results[QuestionType.Closed][QuestionAbout.Words] < this.expectedCorrectAnswers[QuestionType.Closed] ||
      this.results[QuestionType.Closed][QuestionAbout.Translations] < this.expectedCorrectAnswers[QuestionType.Closed]
    ) {
      return QuestionType.Closed;
    }

    if (
      this.results[QuestionType.Open][QuestionAbout.Words] < this.expectedCorrectAnswers[QuestionType.Open] ||
      this.results[QuestionType.Open][QuestionAbout.Translations] < this.expectedCorrectAnswers[QuestionType.Open]
    ) {
      return QuestionType.Open;
    }

    return "";
  }

  public getAvailableQuestionAbouts(questionType: string): string[] {
    const availableQuestionAbouts: string[] = [];
    if (this.results[questionType][QuestionAbout.Words] < this.expectedCorrectAnswers[questionType]) {
      availableQuestionAbouts.push(QuestionAbout.Words);
    }

    if (this.results[questionType][QuestionAbout.Translations] < this.expectedCorrectAnswers[questionType]) {
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
