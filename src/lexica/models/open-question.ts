import { Entry } from "./entry";
import { QuestionAbout } from "./question-about";

export class OpenQuestion {
  constructor(public question: string, public answer: string) {}

  static fromEntry(entry: Entry, questionAbout: QuestionAbout): OpenQuestion {
    const words = entry.words.join(", ");
    const translations = entry.translations.join(", ");

    switch (questionAbout) {
      case QuestionAbout.Translations:
        return new OpenQuestion(words, translations);
      case QuestionAbout.Words:
        return new OpenQuestion(translations, words);
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
