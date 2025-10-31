package tpa.network.interactionservice.infrastructure.adapter.in.rest.command.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateInteractionRequest(
        @NotBlank(message = "User ID is required") String userId,
        @NotBlank(message = "Event ID is required") String eventId,
        boolean viewed,
        boolean booked
) {
}
