package tpa.network.backend.domain.port.in.query;

import tpa.network.backend.domain.readmodel.EventReadModel;

public interface GetEventByIdQuery {
    EventReadModel execute(GetEventByIdRequest request);

    record GetEventByIdRequest(String eventId) { }
}
