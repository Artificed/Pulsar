package tpa.network.backend.infrastructure.adapter.in.rest.query.dto;

public record BookingResponse(
        String id,
        String userId,
        String eventId,
        int quantity
) { }
