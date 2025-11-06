package tpa.network.backend.domain.port.in.query;

import tpa.network.backend.domain.readmodel.UserReadModel;

import java.util.List;

public interface GetAllUsersQuery {
    List<UserReadModel> execute();
}