package tpa.network.backend.domain.port.in.command;

import tpa.network.backend.domain.model.shared.Id;

public interface CreateBookingCommand {
    Id execute(CreateBookingRequest request);

    record CreateBookingRequest(String userId, String eventId, int quantity) { }
}
