import { Entry } from "./entry";

export interface Set {
  setId: number;
  name: string;
  createdAt: string;
  entries: Entry[];
}
