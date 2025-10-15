package tpa.network.interactionservice.infrastructure.adapter.in.rest.query.dto;

public record InteractionResponse(
        String id,
        String userId,
        String eventId,
        boolean viewed,
        boolean booked
) {
}
