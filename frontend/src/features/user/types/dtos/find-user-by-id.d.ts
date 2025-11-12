import { User } from "../user";

export interface FindUserByIdRequest {
  id: string;
}

export interface FindUserByIdResponse {
  user: User;
}

