import { Pages, Urls } from "@app/router/urls";

export interface LearningMode {
  name: string;
  key: string;
  path: string;
}

export const LearningModes: LearningMode[] = [
  {
    name: "Spelling",
    key: "spelling",
    path: Urls.getPathWithoutLeadingSlash(Pages.spellingMode),
  },
  {
    name: "Full",
    key: "full",
    path: Urls.getPathWithoutLeadingSlash(Pages.fullMode),
  },
  {
    name: "Only Open Questions",
    key: "onlyOpenQuestions",
    path: Urls.getPathWithoutLeadingSlash(Pages.onlyOpenQuestions),
  },
  {
    name: "Content",
    key: "content",
    path: Urls.getPathWithoutLeadingSlash(Pages.set),
  },
];
