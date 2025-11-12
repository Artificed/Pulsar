package tpa.network.bookingservice.domain.port.out.grpc;

public interface EventServicePort {
    boolean existsById(String eventId);
}
