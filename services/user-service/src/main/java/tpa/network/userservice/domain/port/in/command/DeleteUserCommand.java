package tpa.network.userservice.domain.port.in.command;

import tpa.network.userservice.domain.model.shared.Id;

public interface DeleteUserCommand {
    Id execute(DeleteUserRequest request);

    record DeleteUserRequest(String userId) { }
}
