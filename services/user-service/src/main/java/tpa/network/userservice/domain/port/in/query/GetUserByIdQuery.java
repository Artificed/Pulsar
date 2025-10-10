package tpa.network.userservice.domain.port.in.query;

import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;

import java.util.Optional;

public interface GetUserByIdQuery {
    Optional<User> execute(Id id);
}
