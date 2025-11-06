package tpa.network.backend.domain.readmodel;

public record BookingReadModel(
        String id,
        String userId,
        String eventId,
        int quantity
) { }
