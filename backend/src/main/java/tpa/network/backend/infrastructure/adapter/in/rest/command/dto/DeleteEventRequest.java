package tpa.network.backend.infrastructure.adapter.in.rest.command.dto;

import jakarta.validation.constraints.NotBlank;

public record DeleteEventRequest(
        @NotBlank(message = "Event ID is required") String id
) {
}
