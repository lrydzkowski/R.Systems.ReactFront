import { LearningModes } from "lexica/common/models/learning-modes";

export default class LearningModeService {
  public static getPath(key: string): string | null {
    for (const learningMode of LearningModes) {
      if (learningMode.key === key) {
        return learningMode.path;
      }
    }

    return null;
  }
}
