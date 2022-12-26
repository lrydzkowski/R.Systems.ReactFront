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
    if (this.results[QuestionAbout.Words] < this.expectedNumOfCorrectAnswers) {
      return false;
    }

    if (this.results[QuestionAbout.Translations] < this.expectedNumOfCorrectAnswers) {
      return false;
    }

    return true;
  }

  public getAvailableQuestionAbouts(): string[] {
    const availableQuestionAbouts = [];
    if (this.results[QuestionAbout.Words] < this.expectedNumOfCorrectAnswers) {
      availableQuestionAbouts.push(QuestionAbout.Words);
    }

    if (this.results[QuestionAbout.Translations] < this.expectedNumOfCorrectAnswers) {
      availableQuestionAbouts.push(QuestionAbout.Translations);
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
      [QuestionAbout.Words]: 0,
      [QuestionAbout.Translations]: 0,
    };
  }

  private sumUpResults(): number {
    return this.results[QuestionAbout.Words] + this.results[QuestionAbout.Translations];
  }
}