export interface LinkInfo {
  name: string;
  validLink: boolean;
}

export const linksNameMap: { [key: string]: LinkInfo } = {
  "/login": {
    name: "Sign in",
    validLink: true,
  },
  "/home": {
    name: "Home",
    validLink: true,
  },
  "/lexica": {
    name: "Lexica",
    validLink: false,
  },
  "/lexica/sets": {
    name: "Sets",
    validLink: true,
  },
  "/test": {
    name: "Test",
    validLink: false,
  },
  "/test/test1": {
    name: "Test1",
    validLink: true,
  },
  "/test/test2": {
    name: "Test2",
    validLink: true,
  },
  "/test/test3": {
    name: "Test3",
    validLink: true,
  },
  "/test/test4": {
    name: "Test4",
    validLink: true,
  },
  "/about": {
    name: "About",
    validLink: true,
  },
};
