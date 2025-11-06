package tpa.network.backend.domain.port.in.query;

import tpa.network.backend.domain.readmodel.UserReadModel;

import java.util.Optional;

public interface GetUserByIdQuery {
    Optional<UserReadModel> execute(String id);
}
