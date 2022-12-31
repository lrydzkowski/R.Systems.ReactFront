import { Urls } from "app/routing/urls";

export interface LearningMode {
  name: string;
  key: string;
  path: string;
}

export const LearningModes: LearningMode[] = [
  {
    name: "Spelling",
    key: "spelling",
    path: Urls.getPathWithoutLeadingSlash("spellingModeWithPaths"),
  },
  {
    name: "Only Open Questions",
    key: "onlyOpenQuestions",
    path: Urls.getPathWithoutLeadingSlash("onlyOpenQuestionsModeWithPaths"),
  },
  {
    name: "Full",
    key: "full",
    path: Urls.getPathWithoutLeadingSlash("fullModeWithPaths"),
  },
  {
    name: "Content",
    key: "content",
    path: Urls.getPathWithoutLeadingSlash("setWithPaths"),
  },
];
