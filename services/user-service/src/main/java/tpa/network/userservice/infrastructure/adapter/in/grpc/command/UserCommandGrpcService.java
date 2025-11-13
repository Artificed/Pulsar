package tpa.network.userservice.infrastructure.adapter.in.grpc.command;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.userservice.*;
import tpa.network.userservice.domain.port.in.command.CreateUserCommand;
import tpa.network.userservice.domain.port.in.command.DeleteUserCommand;
import tpa.network.userservice.domain.port.in.command.UpdateUserCommand;

@Slf4j
@GrpcService
@RequiredArgsConstructor
public class UserCommandGrpcService extends UserCommandServiceGrpc.UserCommandServiceImplBase {

    private final CreateUserCommand createUserCommand;
    private final DeleteUserCommand deleteUserCommand;
    private final UpdateUserCommand updateUserCommand;

    @Override
    public void createUser(CreateUserRequest request, StreamObserver<CreateUserResponse> responseObserver) {
        log.info("gRPC - Received createUser request for username: {}, email: {}", 
                request.getUsername(), request.getEmail());
        
        var dto = new CreateUserCommand.CreateUserRequest(
                request.getUsername(), request.getEmail(),  request.getPassword()
        );

        var id = createUserCommand.execute(dto);

        log.info("gRPC - Successfully created user with id: {}", id.getValue());
        var response = CreateUserResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteUser(DeleteUserRequest request, StreamObserver<DeleteUserResponse> responseObserver) {
        log.info("gRPC - Received deleteUser request for id: {}", request.getId());
        
        var dto = new DeleteUserCommand.DeleteUserRequest(
                request.getId()
        );

        var id = deleteUserCommand.execute(dto);

        log.info("gRPC - Successfully deleted user with id: {}", id.getValue());
        var response = DeleteUserResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateUser(UpdateUserRequest request, StreamObserver<UpdateUserResponse> responseObserver) {
        log.info("gRPC - Received updateUser request for id: {}, new username: {}", 
                request.getId(), request.getUsername());
        
        var dto = new UpdateUserCommand.UpdateUserRequest(
                request.getId(), request.getUsername()
        );

        var id = updateUserCommand.execute(dto);

        log.info("gRPC - Successfully updated user with id: {}", id.getValue());
        var response = UpdateUserResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
