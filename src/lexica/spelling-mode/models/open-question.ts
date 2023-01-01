import { Entry } from "../../common/models/entry";

export class OpenQuestion {
  constructor(private question: string, private answer: string, private questionAbout: string) {}

  static fromEntry(entry: Entry, questionAbout: string): OpenQuestion {
    const words = entry.words.join(", ");
    const translations = entry.translations.join(", ");

    return new OpenQuestion(translations, words, questionAbout);
  }

  isAnswerCorrect(givenAnswer: string): boolean {
    if (givenAnswer.trim() === this.answer) {
      return true;
    }

    return false;
  }

  getQuestion(): string {
    return this.question;
  }

  getAnswer(): string {
    return this.answer;
  }

  getQuestionAbout(): string {
    return this.questionAbout;
  }
}
