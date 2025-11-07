package tpa.network.bookingservice.domain.port.in.command;

import tpa.network.bookingservice.domain.model.shared.Id;

public interface UpdateBookingCommand {
    Id execute(UpdateBookingRequest request);

    record UpdateBookingRequest(String id, String eventId, int quantity) { }
}
