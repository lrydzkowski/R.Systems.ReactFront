import { generateRandomInteger } from "../services/generate-random-integer";
import { shuffleArray } from "../services/shuffle-array";
import { Entry } from "./entry";
import { QuestionAbout } from "./question-about";
import { QuestionType } from "./question-type";
import IWordInfo from "./word-info";

export class Question {
  private static separator = ", ";

  constructor(
    private questions: IWordInfo[],
    private answers: IWordInfo[],
    private possibleAnswers: IWordInfo[][],
    private questionType: string,
    private questionAbout: string
  ) {}

  static fromEntry(entry: Entry, allEntries: Entry[], questionAbout: string): Question {
    let possibleAnswers: IWordInfo[][] = [];

    switch (questionAbout) {
      case QuestionAbout.Translations: {
        if (allEntries.length > 0) {
          possibleAnswers = Question.createPossibleAnswers(
            allEntries.map((entry) => Question.mapWordsToWordInfo(entry.translations)),
            Question.mapWordsToWordInfo(entry.translations)
          );
        }

        return new Question(
          [Question.mapWordToWordInfo(entry.word, entry.wordType)],
          entry.translations.map((translation) => Question.mapWordToWordInfo(translation)),
          possibleAnswers,
          possibleAnswers.length > 0 ? QuestionType.Closed : QuestionType.Open,
          questionAbout
        );
      }
      case QuestionAbout.Words: {
        if (allEntries.length > 0) {
          possibleAnswers = Question.createPossibleAnswers(
            allEntries.map((entry) => [Question.mapWordToWordInfo(entry.word, entry.wordType)]),
            [Question.mapWordToWordInfo(entry.word, entry.wordType)]
          );
        }

        return new Question(
          Question.mapWordsToWordInfo(entry.translations),
          [Question.mapWordToWordInfo(entry.word, entry.wordType)],
          possibleAnswers,
          possibleAnswers.length > 0 ? QuestionType.Closed : QuestionType.Open,
          questionAbout
        );
      }
      case QuestionAbout.Pronunciation: {
        return new Question(
          Question.mapWordsToWordInfo(entry.translations),
          [Question.mapWordToWordInfo(entry.word, entry.wordType)],
          [],
          QuestionType.Open,
          questionAbout
        );
      }
      default:
        throw new Error(`Question about = ${questionAbout} is not handled.`);
    }
  }

  isAnswerCorrect(givenAnswer: string): boolean {
    const givenAnswerToCompare = Question.removeWordTypeFromSerializedValue(givenAnswer)
      .split(Question.separator)
      .map((x) => x.trim())
      .sort()
      .join(Question.separator);
    const answerToCompare = this.answers
      .map((answer) => answer.word)
      .sort()
      .join(Question.separator);

    if (givenAnswerToCompare.toLowerCase() === answerToCompare.toLowerCase()) {
      return true;
    }

    return false;
  }

  getQuestions(): IWordInfo[] {
    return this.questions;
  }

  getQuestion(): string {
    return Question.serializeValues(this.getQuestions());
  }

  getAnswers(): IWordInfo[] {
    return this.answers;
  }

  getAnswer(): string {
    return Question.serializeValues(this.getAnswers());
  }

  getPossibleAnswers(): string[] {
    return this.possibleAnswers.map((possibleAnswer) => Question.serializeValues(possibleAnswer));
  }

  getQuestionType(): string {
    return this.questionType;
  }

  getQuestionAbout(): string {
    return this.questionAbout;
  }

  private static createPossibleAnswers(possibleValues: IWordInfo[][], correctValue: IWordInfo[]): IWordInfo[][] {
    possibleValues = possibleValues.filter(
      (possibleValue) => Question.serializeValues(possibleValue) !== Question.serializeValues(correctValue)
    );

    let possibleAnswers: IWordInfo[][] = [];

    if (possibleValues.length < 3) {
      possibleAnswers = [...possibleValues, correctValue];
      shuffleArray(possibleAnswers);

      return possibleAnswers;
    }

    for (let index = 0; index < 3; index++) {
      let possibleAnswer: IWordInfo[] = [];
      do {
        possibleAnswer = possibleValues[generateRandomInteger(0, possibleValues.length)];
      } while (Question.contains(possibleAnswers, possibleAnswer));
      possibleAnswers.push(possibleAnswer);
    }

    possibleAnswers.push(correctValue);
    shuffleArray(possibleAnswers);

    return possibleAnswers;
  }

  private static contains(wordsInfo: IWordInfo[][], wordInfo: IWordInfo[]): boolean {
    return wordsInfo.map((x) => this.serializeValues(x)).indexOf(this.serializeValues(wordInfo)) !== -1;
  }

  private static serializeValues(values: IWordInfo[]): string {
    return values
      .map((wordInfo) => {
        if (wordInfo.wordType === "unknown") {
          return wordInfo.word;
        }

        return `${wordInfo.word} (${wordInfo.wordType})`;
      })
      .join(Question.separator);
  }

  private static removeWordTypeFromSerializedValue(serializedValue: string): string {
    return serializedValue.replace(/\(.*?\)/g, "");
  }

  private static mapWordsToWordInfo(words: string[]): IWordInfo[] {
    return words.map((word) => Question.mapWordToWordInfo(word));
  }

  private static mapWordToWordInfo(word: string, wordType: string | null = null): IWordInfo {
    return {
      word,
      wordType: wordType === null ? "unknown" : wordType,
    };
  }
}
