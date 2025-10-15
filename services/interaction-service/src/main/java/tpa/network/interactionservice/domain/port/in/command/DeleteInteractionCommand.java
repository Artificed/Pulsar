package tpa.network.interactionservice.domain.port.in.command;

import tpa.network.interactionservice.domain.model.shared.Id;

public interface DeleteInteractionCommand {
    Id execute(DeleteInteractionRequest request);

    record DeleteInteractionRequest(String interactionId) { }
}
