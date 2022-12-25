import { Entry } from "../common/models/entry";
import { QuestionAbout } from "./question-about";

export class OpenQuestion {
  constructor(public question: string, public answer: string, public questionType: string) {}

  static fromEntry(entry: Entry, questionAbout: string): OpenQuestion {
    const words = entry.words.join(", ");
    const translations = entry.translations.join(", ");

    switch (questionAbout) {
      case QuestionAbout.Translations:
        return new OpenQuestion(words, translations, QuestionAbout.Translations);
      case QuestionAbout.Words:
        return new OpenQuestion(translations, words, QuestionAbout.Words);
      default:
        throw new Error(`The type of question = ${questionAbout} is not handled.`);
    }
  }

  isAnswerCorrect(givenAnswer: string): boolean {
    if (givenAnswer === this.answer) {
      return true;
    }

    return false;
  }
}
