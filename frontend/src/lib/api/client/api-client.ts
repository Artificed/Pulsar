import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiResponse } from "./response";

class ApiClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true
    });
  }

  private handleError<T>(error: Error): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      let errorMessage = "An unknown error occured";

      if (typeof responseData === "string") {
        errorMessage = responseData;
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (responseData?.error) {
        errorMessage = responseData.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        statusCode: error.response?.status || 500,
        payload: {} as T,
        error: errorMessage,
      };
    }

    return {
      statusCode: 500,
      payload: {} as T,
      error: error.message || "An unknown error occured",
    };
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<T>(url, config);
      return {
        statusCode: response.status,
        payload: response.data
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async post<T, U = any>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async put<T, U = any>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async patch<T, U = any>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch<T>(url, data, config);
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }
}

export default ApiClient;
