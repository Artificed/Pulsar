package tpa.network.interactionservice.domain.port.in.query;

import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

import java.util.List;

public interface GetAllInteractionsQuery {
    List<InteractionReadModel> execute();
}
