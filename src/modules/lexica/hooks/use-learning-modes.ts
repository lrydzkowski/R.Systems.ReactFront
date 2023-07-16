import { useMemo } from "react";
import useUrls, { Pages } from "@app/router/use-urls";

export default function useLearningModes(): {
  learningModes: ILearningMode[];
  getLearningModePath: (key: string) => string | null;
} {
  const { getPathWithoutLeadingSlash } = useUrls();
  const learningModes = useMemo<ILearningMode[]>(
    () => [
      {
        name: "Spelling",
        key: "spelling",
        path: getPathWithoutLeadingSlash(Pages.spellingMode),
      },
      {
        name: "Full",
        key: "full",
        path: getPathWithoutLeadingSlash(Pages.fullMode),
      },
      {
        name: "Only Open Questions",
        key: "onlyOpenQuestions",
        path: getPathWithoutLeadingSlash(Pages.onlyOpenQuestions),
      },
      {
        name: "Content",
        key: "content",
        path: getPathWithoutLeadingSlash(Pages.set),
      },
    ],
    [getPathWithoutLeadingSlash]
  );

  function getLearningModePath(key: string): string | null {
    for (const learningMode of learningModes) {
      if (learningMode.key === key) {
        return learningMode.path;
      }
    }

    return null;
  }

  return { learningModes, getLearningModePath };
}

export interface ILearningMode {
  name: string;
  key: string;
  path: string;
}
