package tpa.network.interactionservice.domain.port.in.command;

import tpa.network.interactionservice.domain.model.shared.Id;

public interface CreateInteractionCommand {
    Id execute(CreateInteractionRequest request);

    record CreateInteractionRequest(
            String userId,
            String eventId,
            boolean viewed,
            boolean booked
    ) { }
}
