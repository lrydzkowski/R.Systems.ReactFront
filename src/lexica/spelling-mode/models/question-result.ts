import { QuestionAbout } from "./question-about";

export class QuestionResult {
  private results: { [questionAbout: string]: number } = {};

  constructor(private entryIndex: number, private expectedNumOfCorrectAnswers = 2) {
    this.resetResults();
  }

  public getEntryIndex(): number {
    return this.entryIndex;
  }

  public isFinished(): boolean {
    if (this.results[QuestionAbout.Pronunciation] < this.expectedNumOfCorrectAnswers) {
      return false;
    }

    return true;
  }

  public getAvailableQuestionAbouts(): string[] {
    const availableQuestionAbouts = [];
    if (this.results[QuestionAbout.Pronunciation] < this.expectedNumOfCorrectAnswers) {
      availableQuestionAbouts.push(QuestionAbout.Pronunciation);
    }

    return availableQuestionAbouts;
  }

  public updateResult(questionAbout: string, isAnswerCorrect: boolean): number {
    if (isAnswerCorrect) {
      this.results[questionAbout]++;

      return 1;
    } else {
      const currectResult = this.sumUpResults();
      this.resetResults();

      return -currectResult;
    }
  }

  private resetResults(): void {
    this.results = {
      [QuestionAbout.Pronunciation]: 0,
    };
  }

  private sumUpResults(): number {
    return this.results[QuestionAbout.Pronunciation];
  }
}
