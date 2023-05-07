import { generateRandomInteger } from "../services/generate-random-integer";
import { shuffleArray } from "../services/shuffle-array";
import { Entry } from "./entry";
import { QuestionAbout } from "./question-about";
import { QuestionType } from "./question-type";

export class Question {
  private static separator = ", ";

  constructor(
    private questions: string[],
    private answers: string[],
    private possibleAnswers: string[][],
    private questionType: string,
    private questionAbout: string
  ) {}

  static fromEntry(entry: Entry, allEntries: Entry[], questionAbout: string): Question {
    let possibleAnswers: string[][] = [];

    switch (questionAbout) {
      case QuestionAbout.Translations: {
        if (allEntries.length > 0) {
          possibleAnswers = Question.createPossibleAnswers(
            allEntries.map((entry) => entry.translations),
            entry.translations
          );
        }

        return new Question(
          entry.words,
          entry.translations,
          possibleAnswers,
          possibleAnswers.length > 0 ? QuestionType.Closed : QuestionType.Open,
          questionAbout
        );
      }
      case QuestionAbout.Words: {
        if (allEntries.length > 0) {
          possibleAnswers = Question.createPossibleAnswers(
            allEntries.map((entry) => entry.words),
            entry.words
          );
        }

        return new Question(
          entry.translations,
          entry.words,
          possibleAnswers,
          possibleAnswers.length > 0 ? QuestionType.Closed : QuestionType.Open,
          questionAbout
        );
      }
      case QuestionAbout.Pronunciation: {
        return new Question(entry.translations, entry.words, [], QuestionType.Open, questionAbout);
      }
      default:
        throw new Error(`Question about = ${questionAbout} is not handled.`);
    }
  }

  isAnswerCorrect(givenAnswer: string): boolean {
    const givenAnswerToCompare = givenAnswer
      .split(Question.separator)
      .map((x) => x.trim())
      .sort()
      .join(Question.separator);
    const answerToCompare = this.answers.sort().join(Question.separator);

    if (givenAnswerToCompare === answerToCompare) {
      return true;
    }

    return false;
  }

  getQuestions(): string[] {
    return this.questions;
  }

  getQuestion(): string {
    return this.getQuestions().join(Question.separator);
  }

  getAnswers(): string[] {
    return this.answers;
  }

  getAnswer(): string {
    return this.getAnswers().join(Question.separator);
  }

  getPossibleAnswers(): string[] {
    return this.possibleAnswers.map((possibleAnswer) => possibleAnswer.join(Question.separator));
  }

  getQuestionType(): string {
    return this.questionType;
  }

  getQuestionAbout(): string {
    return this.questionAbout;
  }

  private static createPossibleAnswers(possibleValues: string[][], correctValue: string[]): string[][] {
    possibleValues = possibleValues.filter(
      (possibleValue) => Question.serializeValues(possibleValue) !== Question.serializeValues(correctValue)
    );

    let possibleAnswers: string[][] = [];

    if (possibleValues.length < 3) {
      possibleAnswers = [...possibleValues, correctValue];
      shuffleArray(possibleAnswers);

      return possibleAnswers;
    }

    for (let index = 0; index < 3; index++) {
      let possibleAnswer: string[] = [];
      do {
        possibleAnswer = possibleValues[generateRandomInteger(0, possibleValues.length)];
      } while (Question.contains(possibleAnswers, possibleAnswer));
      possibleAnswers.push(possibleAnswer);
    }

    possibleAnswers.push(correctValue);
    shuffleArray(possibleAnswers);

    return possibleAnswers;
  }

  private static contains(values: string[][], value: string[]): boolean {
    return values.map((x) => this.serializeValues(x)).indexOf(this.serializeValues(value)) !== -1;
  }

  private static serializeValues(values: string[]): string {
    return values.join("");
  }
}
