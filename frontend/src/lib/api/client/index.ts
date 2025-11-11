import config from "../constants/config";
import ApiClient from "./api-client";

const userClient = new ApiClient(config.USER_SERVICE_URL!);
const eventCient = new ApiClient(config.EVENT_SERVICE_URL!);
const bookingClient = new ApiClient(config.BOOKING_SERVICE_URL!);

export { userClient, eventCient, bookingClient };
