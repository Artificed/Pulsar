import config from "@/lib/api/config";
import ApiClient from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/response";
import { GetAllBookingsResponse } from "../types/dtos/get-all-bookings";
import { GetBookingByIdResponse } from "../types/dtos/get-booking-by-id";
import { CreateBookingRequest, CreateBookingResponse } from "../types/dtos/create-booking";
import { DeleteBookingRequest, DeleteBookingResponse } from "../types/dtos/delete-booking";

const bookingClient = new ApiClient(config.BOOKING_SERVICE_URL!);

const getAllBookings = async (): Promise<ApiResponse<GetAllBookingsResponse>> => {
  return bookingClient.get<GetAllBookingsResponse>("/bookings");
}

const getBookingById = async (id: string): Promise<ApiResponse<GetBookingByIdResponse>> => {
  return bookingClient.get<GetBookingByIdResponse>(`/bookings/${id}`);
}

const createBooking = async (payload: CreateBookingRequest): Promise<ApiResponse<CreateBookingResponse>> => {
  return bookingClient.post<CreateBookingResponse, CreateBookingRequest>("/bookings", payload);
}

const deleteBooking = async (payload: DeleteBookingRequest): Promise<ApiResponse<DeleteBookingResponse>> => {
  return bookingClient.delete<DeleteBookingResponse>(`/bookings/${payload.id}`);
}

export const bookingService = {
  getAllBookings,
  getBookingById,
  createBooking,
  deleteBooking,
};
