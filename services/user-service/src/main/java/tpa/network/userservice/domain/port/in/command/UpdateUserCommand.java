package tpa.network.userservice.domain.port.in.command;

import tpa.network.userservice.domain.model.shared.Id;

public interface UpdateUserCommand {
    Id execute(UpdateUserRequest request);

    record UpdateUserRequest(String userId, String username) { }
}
