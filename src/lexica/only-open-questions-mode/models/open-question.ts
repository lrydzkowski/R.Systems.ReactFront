import { Entry } from "../../common/models/entry";
import { QuestionAbout } from "./question-about";

export class OpenQuestion {
  constructor(private question: string, private answer: string, private questionAbout: string) {}

  static fromEntry(entry: Entry, questionAbout: string): OpenQuestion {
    const words = entry.words.join(", ");
    const translations = entry.translations.join(", ");

    switch (questionAbout) {
      case QuestionAbout.Translations:
        return new OpenQuestion(words, translations, QuestionAbout.Translations);
      case QuestionAbout.Words:
        return new OpenQuestion(translations, words, QuestionAbout.Words);
      default:
        throw new Error(`Question about = ${questionAbout} is not handled.`);
    }
  }

  isAnswerCorrect(givenAnswer: string): boolean {
    if (givenAnswer === this.answer) {
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
