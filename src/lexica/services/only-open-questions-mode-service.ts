import { Entry } from "lexica/models/entry";
import { OpenQuestion } from "lexica/models/open-question";
import { QuestionAbout } from "lexica/models/question-about";

export class OnlyOpenQuestionsModeService {
  private entries: Entry[];
  private index = 0;

  constructor(entries: Entry[]) {
    this.entries = entries;
  }

  getNextQuestion(): OpenQuestion | null {
    if (this.index === this.entries.length) {
      return null;
    }

    const entry = this.entries[this.index++];

    return OpenQuestion.fromEntry(entry, QuestionAbout.Words);
  }
}
