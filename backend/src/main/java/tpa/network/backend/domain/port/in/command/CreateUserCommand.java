package tpa.network.backend.domain.port.in.command;

import tpa.network.backend.domain.model.shared.Id;

public interface CreateUserCommand {
    Id execute(CreateUserRequest request);

    record CreateUserRequest(String username, String email, String password) { }
}