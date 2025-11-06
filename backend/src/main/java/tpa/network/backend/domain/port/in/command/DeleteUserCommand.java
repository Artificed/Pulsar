package tpa.network.backend.domain.port.in.command;

import tpa.network.backend.domain.model.shared.Id;

public interface DeleteUserCommand {
    Id execute(DeleteUserRequest request);

    record DeleteUserRequest(String userId) { }
}
