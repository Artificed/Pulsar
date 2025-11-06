package tpa.network.backend.domain.port.in.command;

import tpa.network.backend.domain.model.shared.Id;

public interface UpdateUserCommand {
    Id execute(UpdateUserRequest request);

    record UpdateUserRequest(String userId, String username) { }
}
