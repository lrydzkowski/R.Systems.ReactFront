import { QuestionAbout } from "./question-about";

export class QuestionResult {
  private results: { [key: string]: number } = {};

  constructor(private entryIndex: number, private expectedNumberOfCorrectAnswers = 2) {
    this.resetResults();
  }

  public getEntryIndex(): number {
    return this.entryIndex;
  }

  public isFinished(): boolean {
    if (this.results[QuestionAbout.Words] < this.expectedNumberOfCorrectAnswers) {
      return false;
    }

    if (this.results[QuestionAbout.Translations] < this.expectedNumberOfCorrectAnswers) {
      return false;
    }

    return true;
  }

  public getAvailableQuestionTypes(): string[] {
    const availableQuestionTypes = [];
    if (this.results[QuestionAbout.Words] < this.expectedNumberOfCorrectAnswers) {
      availableQuestionTypes.push(QuestionAbout.Words);
    }

    if (this.results[QuestionAbout.Translations] < this.expectedNumberOfCorrectAnswers) {
      availableQuestionTypes.push(QuestionAbout.Translations);
    }

    return availableQuestionTypes;
  }

  public updateResult(questionType: string, isAnswerCorrect: boolean): number {
    if (isAnswerCorrect) {
      this.results[questionType]++;

      return 1;
    } else {
      const currectResult = this.sumUpResults();
      this.resetResults();

      return -currectResult;
    }
  }

  private resetResults(): void {
    this.results = {
      [QuestionAbout.Words]: 0,
      [QuestionAbout.Translations]: 0,
    };
  }

  private sumUpResults(): number {
    return this.results[QuestionAbout.Words] + this.results[QuestionAbout.Translations];
  }
}
