import { Entry } from "lexica/common/models/entry";
import { generateRandomInteger } from "lexica/common/services/generate-random-integer";
import { shuffleArray } from "lexica/common/services/shuffle-array";
import { QuestionAbout } from "./question-about";
import { QuestionType } from "./question-type";

export class Question {
  constructor(
    private question: string,
    private answer: string,
    private possibleAnswers: string[],
    private questionType: string,
    private questionAbout: string
  ) {}

  static fromEntry(entry: Entry, allEntries: Entry[], questionAbout: string): Question {
    const words = entry.words.join(", ");
    const translations = entry.translations.join(", ");
    let possibleAnswers: string[] = [];

    switch (questionAbout) {
      case QuestionAbout.Translations: {
        if (allEntries.length > 0) {
          const allTranslations: string[] = allEntries
            .map((entry) => entry.translations.join(", "))
            .flat()
            .filter((translation) => translation !== translations);
          possibleAnswers = Question.createPossibleAnswers(allTranslations, translations);
        }

        return new Question(
          words,
          translations,
          possibleAnswers,
          possibleAnswers.length > 0 ? QuestionType.Closed : QuestionType.Open,
          questionAbout
        );
      }
      case QuestionAbout.Words: {
        if (allEntries.length > 0) {
          const allWords: string[] = allEntries
            .map((entry) => entry.words.join(", "))
            .flat()
            .filter((word) => word !== words);
          possibleAnswers = Question.createPossibleAnswers(allWords, words);
        }

        return new Question(
          translations,
          words,
          possibleAnswers,
          possibleAnswers.length > 0 ? QuestionType.Closed : QuestionType.Open,
          questionAbout
        );
      }
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

  getPossibleAnswers(): string[] {
    return this.possibleAnswers;
  }

  getQuestionType(): string {
    return this.questionType;
  }

  getQuestionAbout(): string {
    return this.questionAbout;
  }

  private static createPossibleAnswers(possibleValues: string[], correctValue: string): string[] {
    const possibleAnswers = [];
    if (possibleValues.length < 3) {
      for (const possibleValue of possibleValues) {
        possibleAnswers.push(possibleValue);
      }
      possibleAnswers.push(correctValue);
      shuffleArray(possibleAnswers);

      return possibleAnswers;
    }

    for (let index = 0; index < 3; index++) {
      let possibleAnswer = "";
      do {
        possibleAnswer = possibleValues[generateRandomInteger(0, possibleValues.length)];
      } while (possibleAnswers.indexOf(possibleAnswer) !== -1);
      possibleAnswers.push(possibleAnswer);
    }

    possibleAnswers.push(correctValue);
    shuffleArray(possibleAnswers);

    return possibleAnswers;
  }
}
