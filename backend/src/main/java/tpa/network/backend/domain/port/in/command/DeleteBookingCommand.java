package tpa.network.backend.domain.port.in.command;

import tpa.network.backend.domain.model.shared.Id;

public interface DeleteBookingCommand {
    Id execute(DeleteBookingRequest request);

    record DeleteBookingRequest(String id) { }
}
