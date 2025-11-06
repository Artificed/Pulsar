package tpa.network.backend.infrastructure.adapter.in.grpc.command;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.backend.*;
import tpa.network.backend.domain.port.in.command.CreateUserCommand;
import tpa.network.backend.domain.port.in.command.DeleteUserCommand;
import tpa.network.backend.domain.port.in.command.UpdateUserCommand;

@GrpcService
@RequiredArgsConstructor
public class UserCommandGrpcService extends UserCommandServiceGrpc.UserCommandServiceImplBase {

    private final CreateUserCommand createUserCommand;
    private final DeleteUserCommand deleteUserCommand;
    private final UpdateUserCommand updateUserCommand;

    @Override
    public void createUser(CreateUserRequest request, StreamObserver<CreateUserResponse> responseObserver) {
        var dto = new CreateUserCommand.CreateUserRequest(
                request.getUsername(), request.getEmail(),  request.getPassword()
        );

        var id = createUserCommand.execute(dto);

        var response = CreateUserResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteUser(DeleteUserRequest request, StreamObserver<DeleteUserResponse> responseObserver) {
        var dto = new DeleteUserCommand.DeleteUserRequest(
                request.getId()
        );

        var id = deleteUserCommand.execute(dto);

        var response = DeleteUserResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateUser(UpdateUserRequest request, StreamObserver<UpdateUserResponse> responseObserver) {
        var dto = new UpdateUserCommand.UpdateUserRequest(
                request.getId(), request.getUsername()
        );

        var id = updateUserCommand.execute(dto);

        var response = UpdateUserResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
