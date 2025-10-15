package tpa.network.interactionservice.domain.port.in.query;

import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

import java.util.List;

public interface GetInteractionsByUserIdQuery {
    List<InteractionReadModel> execute(GetInteractionsByUserIdRequest request);

    record GetInteractionsByUserIdRequest(String userId) { }
}
