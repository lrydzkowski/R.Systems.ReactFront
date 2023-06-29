import { ICreateSetRequest } from "./create-set-request";

export interface IUpdateSetRequest extends ICreateSetRequest {
  setId: number;
}
