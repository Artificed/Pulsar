package tpa.network.backend.infrastructure.adapter.in.grpc.mapper;

import org.springframework.stereotype.Component;
import tpa.network.backend.User;
import tpa.network.backend.domain.readmodel.UserReadModel;

@Component
public class UserGrpcMapper {

    public User toProto(UserReadModel model) {
        return User.newBuilder()
                .setId(model.id())
                .setUsername(model.username())
                .setEmail(model.email())
                .setPasswordHash(model.password())
                .build();
    }
}
