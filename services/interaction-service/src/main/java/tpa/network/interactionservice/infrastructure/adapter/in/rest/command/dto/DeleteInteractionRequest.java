package tpa.network.interactionservice.infrastructure.adapter.in.rest.command.dto;

import jakarta.validation.constraints.NotBlank;

public record DeleteInteractionRequest(
        @NotBlank(message = "Interaction ID is required") String id
) {
}
