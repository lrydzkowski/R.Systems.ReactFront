import { Entry } from "lexica/common/models/entry";
import { generateRandomInteger } from "lexica/common/services/generate-random-integer";
import { shuffleArray } from "lexica/common/services/shuffle-array";
import { OpenQuestion } from "./models/open-question";
import { QuestionResult } from "./models/question-result";

export class SpellingModeService {
  private entries: Entry[] = [];
  private results: QuestionResult[] = [];
  private index = 0;
  private statistics = {
    correctAnswers: 0,
    allQuestionsToAsk: 0,
  };

  constructor(entries: Entry[]) {
    this.entries = entries;
    shuffleArray(this.results);
    for (let index = 0; index < this.entries.length; index++) {
      this.results.push(new QuestionResult(index));
      this.statistics.allQuestionsToAsk += 2;
    }
  }

  getNumberOfCorrectAnswers() {
    return this.statistics.correctAnswers;
  }

  getNumberOfAllQuestionsToAsk(): number {
    return this.statistics.allQuestionsToAsk;
  }

  getNextQuestion(): OpenQuestion | null {
    if (this.isFinished()) {
      return null;
    }

    let question: OpenQuestion | null = null;
    while (question === null) {
      if (this.index === this.results.length) {
        this.resetIndex();
      }

      const result = this.results[this.index];
      const availableQuestionAbouts = result.getAvailableQuestionAbouts();
      if (availableQuestionAbouts.length === 0) {
        this.index++;
        continue;
      }

      const questionAbout = availableQuestionAbouts[generateRandomInteger(0, availableQuestionAbouts.length)];
      question = OpenQuestion.fromEntry(this.entries[result.getEntryIndex()], questionAbout);
    }

    return question;
  }

  verifyAnswer(question: OpenQuestion, givenAnswer: string): boolean {
    const isCorrect: boolean = question.isAnswerCorrect(givenAnswer);
    this.statistics.correctAnswers += this.results[this.index].updateResult(question.getQuestionAbout(), isCorrect);
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
