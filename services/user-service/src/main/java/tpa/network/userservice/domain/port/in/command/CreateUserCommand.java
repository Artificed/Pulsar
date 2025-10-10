package tpa.network.userservice.domain.port.in.command;

import tpa.network.userservice.domain.model.shared.Id;

public interface CreateUserCommand {
    Id execute(Request request);

    record Request(String username, String email, String password) { }
}