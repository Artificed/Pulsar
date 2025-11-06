package tpa.network.backend.domain.port.in.command;

import tpa.network.backend.domain.model.shared.Id;

public interface DeleteEventCommand {
    Id execute(DeleteEventRequest request);

    record DeleteEventRequest(String eventId) { }
}
