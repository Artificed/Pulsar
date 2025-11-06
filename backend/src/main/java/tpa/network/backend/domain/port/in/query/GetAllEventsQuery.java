package tpa.network.backend.domain.port.in.query;

import tpa.network.backend.domain.readmodel.EventReadModel;

import java.util.List;

public interface GetAllEventsQuery {
    List<EventReadModel> execute();
}
