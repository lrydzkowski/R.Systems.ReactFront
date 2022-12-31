export class Urls {
  static pages: IPages = {
    login: { path: "/login", name: "Sign in", validLink: true },
    home: { path: "/home", name: "Home", validLink: true },
    lexica: { path: "/lexica", name: "Lexica", validLink: false },
    sets: { path: "/lexica/sets", name: "Sets", validLink: true },
    set: { path: "/lexica/sets/content", name: "Content", validLink: false },
    setWithPaths: { path: "/lexica/sets/content/:setPaths", validLink: true },
    spellingMode: { path: "/lexica/sets/spelling-mode", name: "Spelling Mode", validLink: false },
    spellingModeWithPaths: { path: "/lexica/sets/spelling-mode/:setPaths", validLink: true },
    fullMode: { path: "/lexica/sets/full-mode", name: "Full Mode", validLink: false },
    fullModeWithPaths: { path: "/lexica/sets/full-mode/:setPaths", validLink: true },
    onlyOpenQuestionsMode: {
      path: "/lexica/sets/only-open-questions-mode",
      name: "Only Open Questions Mode",
      validLink: false,
    },
    onlyOpenQuestionsModeWithPaths: { path: "/lexica/sets/only-open-questions-mode/:setPaths", validLink: true },
    test: { path: "/test", name: "Test", validLink: false },
    test1: { path: "/test/test1", name: "Test1", validLink: true },
    test2: { path: "/test/test2", name: "Test2", validLink: true },
    test3: { path: "/test/test3", name: "Test3", validLink: true },
    test4: { path: "/test/test4", name: "Test4", validLink: true },
    about: { path: "/about", name: "About", validLink: true },
  };

  static getPageByPath(path: string): IPageInfo | null {
    for (const key in Urls.pages) {
      if (Object.prototype.hasOwnProperty.call(Urls.pages, key)) {
        const element = Urls.pages[key];
        if (element.path === path) {
          return element;
        }
      }
    }

    return null;
  }

  static getPathWithoutLeadingSlash(key: string): string {
    if (Urls.pages[key] === undefined) {
      throw new Error(`No page with key = ${key}.`);
    }

    return Urls.pages[key].path.substring(1);
  }
}

interface IPages {
  [key: string]: IPageInfo;
}

interface IPageInfo {
  path: string;
  name?: string;
  validLink: boolean;
}
