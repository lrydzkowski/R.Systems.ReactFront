import { useMemo } from "react";
import useSetsApi from "@lexica/api/use-sets-api";

export class Pages {
  public static readonly login = "login";
  public static readonly home = "home";
  public static readonly lexicaLabel = "lexicaLabel";
  public static readonly sets = "sets";
  public static readonly newSet = "newSet";
  public static readonly editSetLabel = "editSetLabel";
  public static readonly editSet = "editSet";
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

export default function useUrls(): {
  urls: Map<string, IPageInfo>;
  getPath: (key: string) => string;
  getName: (key: string) => string;
  getPathWithoutLeadingSlash: (key: string) => string;
  getPageByPath: (path: string) => IPageInfo | null;
  isMatch: (path: string, actualPath: string) => boolean;
} {
  const { getSetNamesAsync } = useSetsApi();
  const urls = useMemo<Map<string, IPageInfo>>(
    () =>
      new Map([
        [Pages.login, { path: "/login", name: "Sign in", validLink: true }],
        [Pages.home, { path: "/home", name: "Home", validLink: true }],
        [Pages.lexicaLabel, { path: "/lexica", name: "Lexica", validLink: false }],
        [Pages.sets, { path: "/lexica/sets", name: "Sets", validLink: true }],
        [Pages.newSet, { path: "/lexica/sets/new-set", name: "New set", validLink: true }],
        [Pages.editSetLabel, { path: "/lexica/sets/edit-set", name: "Edit set", validLink: false }],
        [Pages.editSet, { path: "/lexica/sets/edit-set/:setId", validLink: true, getNameAsync: getSetNamesAsync }],
        [Pages.setLabel, { path: "/lexica/sets/content", name: "Content", validLink: false }],
        [
          Pages.set,
          {
            path: "/lexica/sets/content/:setIds",
            validLink: true,
            getNameAsync: getSetNamesAsync,
          },
        ],
        [Pages.spellingModeLabel, { path: "/lexica/sets/spelling-mode", name: "Spelling Mode", validLink: false }],
        [
          Pages.spellingMode,
          { path: "/lexica/sets/spelling-mode/:setIds", validLink: true, getNameAsync: getSetNamesAsync },
        ],
        [Pages.fullModeLabel, { path: "/lexica/sets/full-mode", name: "Full Mode", validLink: false }],
        [Pages.fullMode, { path: "/lexica/sets/full-mode/:setIds", validLink: true, getNameAsync: getSetNamesAsync }],
        [
          Pages.onlyOpenQuestionsLabel,
          { path: "/lexica/sets/only-open-questions-mode", name: "Only Open Questions Mode", validLink: false },
        ],
        [
          Pages.onlyOpenQuestions,
          { path: "/lexica/sets/only-open-questions-mode/:setIds", validLink: true, getNameAsync: getSetNamesAsync },
        ],
        [Pages.about, { path: "/about", name: "About", validLink: true }],
      ]),
    []
  );

  function getPath(key: string): string {
    if (!urls.has(key)) {
      throw new Error(`No page with key = ${key}.`);
    }

    return urls.get(key)?.path ?? "";
  }

  function getName(key: string): string {
    if (!urls.has(key)) {
      throw new Error(`No page with key = ${key}.`);
    }

    return urls.get(key)?.name ?? "";
  }

  function getPathWithoutLeadingSlash(key: string): string {
    if (!urls.has(key)) {
      throw new Error(`No page with key = ${key}.`);
    }

    return urls.get(key)?.path.substring(1) ?? "";
  }

  function getPageByPath(path: string): IPageInfo | null {
    const found = [...urls].map(([key, page]) => ({ key, page })).filter((element) => isMatch(element.page.path, path));
    if (found.length === 0) {
      return null;
    }

    return found[0].page;
  }

  function isMatch(path: string, actualPath: string): boolean {
    const pathParts = path?.trim()?.toLowerCase()?.split("/") ?? [];
    const actualPathParts = actualPath?.trim()?.toLowerCase()?.split("/") ?? [];

    if (pathParts.length !== actualPathParts.length) {
      return false;
    }

    for (let i = 0; i < pathParts.length; i++) {
      if (pathParts[i].startsWith(":")) {
        continue;
      }

      if (pathParts[i] !== actualPathParts[i]) {
        return false;
      }
    }

    return true;
  }

  return { urls, getPath, getName, getPathWithoutLeadingSlash, getPageByPath, isMatch };
}

interface IPageInfo {
  path: string;
  name?: string;
  validLink: boolean;
  getNameAsync?: (abortController: AbortController, value: string) => Promise<string>;
}
