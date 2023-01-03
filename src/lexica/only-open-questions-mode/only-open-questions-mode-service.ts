import { Entry } from "lexica/common/models/entry";
import { Question } from "lexica/common/models/question";
import { QuestionAbout } from "lexica/common/models/question-about";
import { QuestionResult } from "lexica/common/models/question-result";
import { QuestionType } from "lexica/common/models/question-type";
import { generateRandomInteger } from "lexica/common/services/generate-random-integer";
import { shuffleArray } from "lexica/common/services/shuffle-array";

export class OnlyOpenQuestionsModeService {
  private entries: Entry[] = [];
  private results: QuestionResult[] = [];
  private index = 0;
  private statistics = {
    correctAnswers: 0,
    allQuestionsToAsk: 0,
  };

  constructor(entries: Entry[]) {
    this.entries = entries;
    shuffleArray(this.entries);
    for (let index = 0; index < this.entries.length; index++) {
      this.results.push(
        new QuestionResult(index, {
          [QuestionType.Open]: {
            [QuestionAbout.Words]: 2,
            [QuestionAbout.Translations]: 2,
          },
        })
      );
      this.statistics.allQuestionsToAsk += 4;
    }
  }

  getNumberOfCorrectAnswers() {
    return this.statistics.correctAnswers;
  }

  getNumberOfAllQuestionsToAsk(): number {
    return this.statistics.allQuestionsToAsk;
  }

  getNextQuestion(): Question | null {
    if (this.isFinished()) {
      return null;
    }

    let question: Question | null = null;
    while (question === null) {
      if (this.index === this.results.length) {
        this.resetIndex();
      }

      const result = this.results[this.index];
      const availableQuestionAbouts = result.getAvailableQuestionAbouts(QuestionType.Open);
      if (availableQuestionAbouts.length === 0) {
        this.index++;
        continue;
      }

      const questionAbout = availableQuestionAbouts[generateRandomInteger(0, availableQuestionAbouts.length)];
      question = Question.fromEntry(this.entries[result.getEntryIndex()], [], questionAbout);
    }

    return question;
  }

  verifyAnswer(question: Question, givenAnswer: string): boolean {
    const isCorrect: boolean = question.isAnswerCorrect(givenAnswer);
    this.statistics.correctAnswers += this.results[this.index].updateResult(
      QuestionType.Open,
      question.getQuestionAbout(),
      isCorrect
    );
    this.index++;

    return isCorrect;
  }

  private resetIndex(): void {
    this.index = 0;
    shuffleArray(this.results);
  }

  private isFinished(): boolean {
    return this.statistics.correctAnswers === this.statistics.allQuestionsToAsk;
  }
}
