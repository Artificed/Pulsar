import config from "@/lib/api/config";
import ApiClient from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/response";
import { RegisterRequest, RegisterResponse } from "../types/dtos/register";
import { LoginRequest, LoginResponse } from "../types/dtos/login";
import { ValidateTokenRequest, ValidateTokenResponse } from "../types/dtos/validate-token";
import { RefreshTokenRequest, RefreshTokenResponse } from "../types/dtos/refresh-token";

const authClient = new ApiClient(config.AUTH_SERVICE_URL!);

const register = async (payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
  return authClient.post<RegisterResponse, RegisterRequest>("/auth/register", payload);
}

const login = async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  return authClient.post<LoginResponse, LoginRequest>("/auth/login", payload);
}

const validateToken = async (payload: ValidateTokenRequest): Promise<ApiResponse<ValidateTokenResponse>> => {
  return authClient.post<ValidateTokenResponse, ValidateTokenRequest>("/auth/validate", payload);
}

const refreshToken = async (payload: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> => {
  return authClient.post<RefreshTokenResponse, RefreshTokenRequest>("/auth/refresh", payload);
}

export const authService = {
  register,
  login,
  validateToken,
  refreshToken,
};
