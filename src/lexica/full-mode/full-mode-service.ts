import { Entry } from "lexica/common/models/entry";
import { generateRandomInteger } from "lexica/common/services/generate-random-integer";
import { shuffleArray } from "lexica/common/services/shuffle-array";
import { Question } from "./models/question";
import { QuestionResult } from "./models/question-result";
import { QuestionType } from "./models/question-type";

export class FullModeService {
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
      this.results.push(new QuestionResult(index));
      this.statistics.allQuestionsToAsk += 6;
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
      const availableQuestionType: string = result.getAvailableQuestionType();
      const availableQuestionAbouts: string[] = result.getAvailableQuestionAbouts(availableQuestionType);
      if (availableQuestionAbouts.length === 0) {
        this.index++;
        continue;
      }

      const questionAbout = availableQuestionAbouts[generateRandomInteger(0, availableQuestionAbouts.length)];
      question = Question.fromEntry(
        this.entries[result.getEntryIndex()],
        availableQuestionType === QuestionType.Closed ? this.entries : [],
        questionAbout
      );
    }

    return question;
  }

  verifyAnswer(question: Question, givenAnswer: string): boolean {
    const isCorrect: boolean = question.isAnswerCorrect(givenAnswer);
    this.statistics.correctAnswers += this.results[this.index].updateResult(
      question.getQuestionType(),
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
