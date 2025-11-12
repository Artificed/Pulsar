import config from "@/lib/api/config";
import ApiClient from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/response";
import { GetAllUsersResponse } from "../types/dtos/get-all-users";
import { FindUserByIdResponse } from "../types/dtos/find-user-by-id";
import { CreateUserRequest, CreateUserResponse } from "../types/dtos/create-user";
import { DeleteUserRequest, DeleteUserResponse } from "../types/dtos/delete-user";
import { UpdateUserRequest, UpdateUserResponse } from "../types/dtos/update-user";

const userClient = new ApiClient(config.USER_SERVICE_URL!);

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
