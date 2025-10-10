package tpa.network.userservice.domain.port.in.query;

import tpa.network.userservice.domain.model.user.User;

import java.util.List;

public interface GetAllUsersQuery {
    List<User> execute();
}