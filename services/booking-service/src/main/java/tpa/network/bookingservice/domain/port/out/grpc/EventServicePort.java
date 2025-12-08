package tpa.network.bookingservice.domain.port.out.grpc;

import tpa.network.bookingservice.domain.readmodel.EventReadModel;

import java.util.Optional;

public interface EventServicePort {
    boolean existsById(String eventId);
    Optional<EventReadModel> getEventById(String eventId);
}
