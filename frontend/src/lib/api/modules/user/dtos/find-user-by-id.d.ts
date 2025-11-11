import { User } from "@/types/entity/user";

export interface FindUserByIdRequest {
  id: string;
}

export interface FindUserByIdResponse {
  user: User;
}
