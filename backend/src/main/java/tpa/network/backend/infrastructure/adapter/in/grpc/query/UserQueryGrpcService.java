package tpa.network.backend.infrastructure.adapter.in.grpc.query;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.backend.*;
import tpa.network.backend.domain.port.in.query.GetAllUsersQuery;
import tpa.network.backend.domain.port.in.query.GetUserByIdQuery;
import tpa.network.backend.infrastructure.adapter.in.grpc.mapper.UserGrpcMapper;

@GrpcService
@RequiredArgsConstructor
public class UserQueryGrpcService extends UserQueryServiceGrpc.UserQueryServiceImplBase {

    private final GetAllUsersQuery getAllUsersQuery;
    private final GetUserByIdQuery getUserByIdQuery;

    private final UserGrpcMapper userGrpcMapper;

    @Override
    public void getAllUsers(GetAllUsersRequest request, StreamObserver<GetAllUsersResponse> responseObserver) {
        var users = getAllUsersQuery.execute();

        var response = GetAllUsersResponse.newBuilder()
                .addAllUsers(users.stream().map(userGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getUserById(GetUserByIdRequest request, StreamObserver<GetUserByIdResponse> responseObserver) {
        var user = getUserByIdQuery.execute(request.getId());

        var responseBuilder = GetUserByIdResponse.newBuilder();
        user.map(userGrpcMapper::toProto).ifPresent(responseBuilder::setUser);

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
