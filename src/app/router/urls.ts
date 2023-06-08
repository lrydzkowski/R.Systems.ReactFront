export class Pages {
  public static readonly login = "login";
  public static readonly home = "home";
  public static readonly lexicaLabel = "lexicaLabel";
  public static readonly sets = "sets";
  public static readonly setLabel = "setLabel";
  public static readonly set = "set";
  public static readonly spellingModeLabel = "spellingModeLabel";
  public static readonly spellingMode = "spellingMode";
  public static readonly fullModeLabel = "fullModeLabel";
  public static readonly fullMode = "fullMode";
  public static readonly onlyOpenQuestionsLabel = "onlyOpenQuestionsLabel";
  public static readonly onlyOpenQuestions = "onlyOpenQuestions";
  public static readonly about = "about";
}

export class Urls {
  private static pages: Map<string, IPageInfo> = new Map([
    [Pages.login, { path: "/login", name: "Sign in", validLink: true }],
    [Pages.home, { path: "/home", name: "Home", validLink: true }],
    [Pages.lexicaLabel, { path: "/lexica", name: "Lexica", validLink: false }],
    [Pages.sets, { path: "/lexica/sets", name: "Sets", validLink: true }],
    [Pages.setLabel, { path: "/lexica/sets/content", name: "Content", validLink: false }],
    [Pages.set, { path: "/lexica/sets/content/:setIds", validLink: true }],
    [Pages.spellingModeLabel, { path: "/lexica/sets/spelling-mode", name: "Spelling Mode", validLink: false }],
    [Pages.spellingMode, { path: "/lexica/sets/spelling-mode/:setIds", validLink: true }],
    [Pages.fullModeLabel, { path: "/lexica/sets/full-mode", name: "Full Mode", validLink: false }],
    [Pages.fullMode, { path: "/lexica/sets/full-mode/:setIds", validLink: true }],
    [
      Pages.onlyOpenQuestionsLabel,
      { path: "/lexica/sets/only-open-questions-mode", name: "Only Open Questions Mode", validLink: false },
    ],
    [Pages.onlyOpenQuestions, { path: "/lexica/sets/only-open-questions-mode/:setIds", validLink: true }],
    [Pages.about, { path: "/about", name: "About", validLink: true }],
  ]);

  public static getPath(key: string): string {
    if (!Urls.pages.has(key)) {
      throw new Error(`No page with key = ${key}.`);
    }

    return Urls.pages.get(key)?.path ?? "";
  }

  public static getName(key: string): string {
    if (!Urls.pages.has(key)) {
      throw new Error(`No page with key = ${key}.`);
    }

    return Urls.pages.get(key)?.name ?? "";
  }

  public static getPathWithoutLeadingSlash(key: string): string {
    if (!Urls.pages.has(key)) {
      throw new Error(`No page with key = ${key}.`);
    }

    return Urls.pages.get(key)?.path.substring(1) ?? "";
  }

  public static getPageByPath(path: string): IPageInfo | null {
    const found = [...Urls.pages]
      .map(([key, page]) => ({ key, page }))
      .filter((element) => element.page.path.toLowerCase() === path.toLowerCase());
    if (found.length === 0) {
      return null;
    }

    return found[0].page;
  }
}

interface IPageInfo {
  path: string;
  name?: string;
  validLink: boolean;
}
