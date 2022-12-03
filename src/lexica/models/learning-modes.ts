export interface LearningMode {
  name: string;
  key: string;
  path: string;
}

export const LearningModes: LearningMode[] = [
  {
    name: "Spelling",
    key: "spelling",
    path: "lexica/sets/spelling-mode/:setPaths",
  },
  {
    name: "Only Open Questions",
    key: "onlyOpenQuestions",
    path: "lexica/sets/only-open-questions-mode/:setPaths",
  },
  {
    name: "Full",
    key: "full",
    path: "lexica/sets/full-mode/:setPaths",
  },
  {
    name: "Content",
    key: "content",
    path: "lexica/sets/content/:setPaths",
  },
];
