package tpa.network.interactionservice.infrastructure.adapter.in.rest.command.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateInteractionRequest(
        @NotBlank(message = "Interaction ID is required") String id,
        boolean viewed,
        boolean booked
) {
}
