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
  "/sets": {
    name: "Sets",
    validLink: true,
  },
  "/test1": {
    name: "Test1",
    validLink: false,
  },
  "/test1/test1": {
    name: "Test11",
    validLink: true,
  },
  "/test1/test2": {
    name: "Test12",
    validLink: true,
  },
  "/test2": {
    name: "Test2",
    validLink: false,
  },
  "/test2/test1": {
    name: "Test21",
    validLink: true,
  },
  "/test2/test2": {
    name: "Test22",
    validLink: true,
  },
  "/about": {
    name: "About",
    validLink: true,
  },
};
