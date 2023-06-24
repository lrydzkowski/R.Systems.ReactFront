export interface ICreateSetRequest {
  setName: string;
  entries: ICreateSetEntity[];
}

export interface ICreateSetEntity {
  word: string;
  wordType: string;
  translations: string[];
}

export interface ICreateSetResponse {
  setId: string;
}
