import { QuestionAbout } from "lexica/common/models/question-about";
import { QuestionType } from "lexica/common/models/question-type";

export class QuestionResult {
  private expectedCorrectAnswers: { [key: string]: { [key: string]: number } } = {
    [QuestionType.Closed]: {
      [QuestionAbout.Words]: 0,
      [QuestionAbout.Translations]: 0,
      [QuestionAbout.Pronunciation]: 0,
    },
    [QuestionType.Open]: {
      [QuestionAbout.Words]: 0,
      [QuestionAbout.Translations]: 0,
      [QuestionAbout.Pronunciation]: 0,
    },
  };

  private results: { [key: string]: { [key: string]: number } } = {
    [QuestionType.Closed]: {
      [QuestionAbout.Words]: 0,
      [QuestionAbout.Translations]: 0,
      [QuestionAbout.Pronunciation]: 0,
    },
    [QuestionType.Open]: {
      [QuestionAbout.Words]: 0,
      [QuestionAbout.Translations]: 0,
      [QuestionAbout.Pronunciation]: 0,
    },
  };

  private availableQuestionTypes: string[] = [QuestionType.Closed, QuestionType.Open];

  private availableQuestionAbouts: string[] = [
    QuestionAbout.Words,
    QuestionAbout.Translations,
    QuestionAbout.Pronunciation,
  ];

  constructor(private entryIndex: number, expectedCorrectAnswers = {}) {
    this.expectedCorrectAnswers = {
      ...this.expectedCorrectAnswers,
      ...expectedCorrectAnswers,
    };
    this.resetResults();
  }

  public getEntryIndex(): number {
    return this.entryIndex;
  }

  public isFinished(): boolean {
    for (const questionType of this.availableQuestionTypes) {
      for (const availableQuestionAbout of this.availableQuestionAbouts) {
        if (
          this.results[questionType][availableQuestionAbout] <
          this.expectedCorrectAnswers[questionType][availableQuestionAbout]
        ) {
          return false;
        }
      }
    }

    return true;
  }

  public getAvailableQuestionType(): string | null {
    for (const questionType of this.availableQuestionTypes) {
      for (const questionAbout of this.availableQuestionAbouts) {
        if (this.results[questionType][questionAbout] < this.expectedCorrectAnswers[questionType][questionAbout]) {
          return questionType;
        }
      }
    }

    return null;
  }

  public getAvailableQuestionAbouts(questionType: string): string[] {
    const availableQuestionAbouts: string[] = [];
    for (const questionAbout of this.availableQuestionAbouts) {
      if (this.results[questionType][questionAbout] < this.expectedCorrectAnswers[questionType][questionAbout]) {
        availableQuestionAbouts.push(questionAbout);
      }
    }

    return availableQuestionAbouts;
  }

  public updateResult(questionType: string, questionAbout: string, isAnswerCorrect: boolean): number {
    if (isAnswerCorrect) {
      this.results[questionType][questionAbout]++;

      return 1;
    }

    const currectResult = this.sumUpResults(questionType);
    this.resetResultsByQuestionType(questionType);

    return -currectResult;
  }

  private resetResults(): void {
    for (const questionType of this.availableQuestionTypes) {
      this.resetResultsByQuestionType(questionType);
    }
  }

  private resetResultsByQuestionType(questionType: string): void {
    for (const questionAbout of this.availableQuestionAbouts) {
      this.results[questionType][questionAbout] = 0;
    }
  }

  private sumUpResults(questionType: string): number {
    let sum = 0;
    for (const questionAbout of this.availableQuestionAbouts) {
      sum += this.results[questionType][questionAbout];
    }

    return sum;
  }
}
