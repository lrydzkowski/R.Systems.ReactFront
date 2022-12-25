import { Entry } from "lexica/common/models/entry";
import { shuffleArray } from "lexica/common/services/shuffle-array";
import { OpenQuestion } from "./open-question";
import { QuestionResult } from "./question-result";

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
    for (let index = 0; index < this.entries.length; index++) {
      this.results.push(new QuestionResult(index));
      this.statistics.allQuestionsToAsk += 4;
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
      const availableQuestionTypes = result.getAvailableQuestionTypes();
      if (availableQuestionTypes.length === 0) {
        this.index++;
        continue;
      }

      const questionType = availableQuestionTypes[Math.floor(Math.random() * availableQuestionTypes.length)];
      question = OpenQuestion.fromEntry(this.entries[result.getEntryIndex()], questionType);
    }

    return question;
  }

  verifyAnswer(question: OpenQuestion, givenAnswer: string): boolean {
    const isCorrect: boolean = question.isAnswerCorrect(givenAnswer);
    this.statistics.correctAnswers += this.results[this.index].updateResult(question.questionType, isCorrect);
    this.index++;

    return isCorrect;
  }

  private subtractCorrectAnswer(): void {
    if (this.statistics.correctAnswers === 0) {
      return;
    }

    this.statistics.correctAnswers--;
  }

  private resetIndex(): void {
    this.index = 0;
    shuffleArray(this.results);
  }

  private isFinished(): boolean {
    return this.statistics.correctAnswers === this.statistics.allQuestionsToAsk;
  }
}
