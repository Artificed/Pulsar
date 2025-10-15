package tpa.network.interactionservice.domain.port.in.command;

import tpa.network.interactionservice.domain.model.shared.Id;

public interface UpdateInteractionCommand {
    Id execute(UpdateInteractionRequest request);

    record UpdateInteractionRequest(
            String interactionId,
            boolean viewed,
            boolean booked
    ) { }
}
