import { WordType } from "@lexica/models/word-type";

export function mapToWordType(wordType: string) {
  switch (wordType) {
    case "verb":
      return WordType.Verb;
    case "adjective":
      return WordType.Adjective;
    case "adverb":
      return WordType.Adverb;
    case "noun":
    default:
      return WordType.Noun;
  }
}
