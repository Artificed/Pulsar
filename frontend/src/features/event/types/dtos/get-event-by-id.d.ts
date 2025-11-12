import { Event } from "../event";

export interface GetEventByIdRequest {
  id: string;
}

export interface GetEventByIdResponse {
  event: Event;
}
