package tpa.network.backend.domain.port.in.command;

import tpa.network.backend.domain.model.shared.Id;

public interface UpdateBookingCommand {
    Id execute(UpdateBookingRequest request);

    record UpdateBookingRequest(String id, String eventId, int quantity) { }
}
