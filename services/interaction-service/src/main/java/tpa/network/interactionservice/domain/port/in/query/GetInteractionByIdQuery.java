package tpa.network.interactionservice.domain.port.in.query;

import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

public interface GetInteractionByIdQuery {
    InteractionReadModel execute(GetInteractionByIdRequest request);

    record GetInteractionByIdRequest(String interactionId) { }
}
