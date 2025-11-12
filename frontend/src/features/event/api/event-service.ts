import config from "@/lib/api/config";
import ApiClient from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/response";
import { GetAllEventsResponse } from "../types/dtos/get-all-events";
import { GetEventByIdResponse } from "../types/dtos/get-event-by-id";
import { CreateEventRequest, CreateEventResponse } from "../types/dtos/create-event";
import { DeleteEventRequest, DeleteEventResponse } from "../types/dtos/delete-event";

const eventClient = new ApiClient(config.EVENT_SERVICE_URL!);

const getAllEvents = async (): Promise<ApiResponse<GetAllEventsResponse>> => {
  return eventClient.get<GetAllEventsResponse>("/events");
}

const getEventById = async (id: string): Promise<ApiResponse<GetEventByIdResponse>> => {
  return eventClient.get<GetEventByIdResponse>(`/events/${id}`);
}

const createEvent = async (payload: CreateEventRequest): Promise<ApiResponse<CreateEventResponse>> => {
  return eventClient.post<CreateEventResponse, CreateEventRequest>("/events", payload);
}

const deleteEvent = async (payload: DeleteEventRequest): Promise<ApiResponse<DeleteEventResponse>> => {
  return eventClient.delete<DeleteEventResponse>(`/events/${payload.id}`);
}

export const eventService = {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
};
