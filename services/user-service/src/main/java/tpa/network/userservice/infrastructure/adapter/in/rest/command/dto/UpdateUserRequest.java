package tpa.network.userservice.infrastructure.adapter.in.rest.command.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(
        @NotBlank(message = "User ID is required") String id,
        @NotBlank(message = "Username is required") String username
) {
}
