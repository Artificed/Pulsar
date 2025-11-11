import { userClient } from "../../client";
import { ApiResponse } from "../../client/response";
import { CreateUserRequest, CreateUserResponse } from "./dtos/create-user";
import { DeleteUserRequest, DeleteUserResponse } from "./dtos/delete-user";
import { FindUserByIdResponse } from "./dtos/find-user-by-id";
import { GetAllUsersResponse } from "./dtos/get-all-users";
import { UpdateUserRequest, UpdateUserResponse } from "./dtos/update-user";

const getAllUsers = async (): Promise<ApiResponse<GetAllUsersResponse>> => {
  return userClient.get<GetAllUsersResponse>("/users");
}

const findUserById = async (id: string): Promise<ApiResponse<FindUserByIdResponse>> => {
  return userClient.get<FindUserByIdResponse>(`/users/${id}`);
}

const createUser = async (payload: CreateUserRequest): Promise<ApiResponse<CreateUserResponse>> => {
  return userClient.post<CreateUserResponse, CreateUserRequest>("/users", payload);
}

const deleteUser = async (payload: DeleteUserRequest): Promise<ApiResponse<DeleteUserResponse>> => {
  return userClient.delete<DeleteUserResponse>(`/users/${payload.id}`);
}

const updateUser = async (payload: UpdateUserRequest): Promise<ApiResponse<UpdateUserResponse>> => {
  return userClient.put<UpdateUserResponse, UpdateUserRequest>(`/users/${payload.id}`, payload);
}

export const userService = {
  getAllUsers,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
};
