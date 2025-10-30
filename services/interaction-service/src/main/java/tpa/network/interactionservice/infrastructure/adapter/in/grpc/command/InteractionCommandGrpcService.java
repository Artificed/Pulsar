package tpa.network.interactionservice.infrastructure.adapter.in.grpc.command;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.interactionservice.*;
import tpa.network.interactionservice.domain.port.in.command.CreateInteractionCommand;
import tpa.network.interactionservice.domain.port.in.command.UpdateInteractionCommand;
import tpa.network.interactionservice.domain.port.in.command.DeleteInteractionCommand;

@GrpcService
@RequiredArgsConstructor
public class InteractionCommandGrpcService extends InteractionCommandServiceGrpc.InteractionCommandServiceImplBase {

    private final CreateInteractionCommand createInteractionCommand;
    private final UpdateInteractionCommand updateInteractionCommand;
    private final DeleteInteractionCommand deleteInteractionCommand;

    @Override
    public void createInteraction(CreateInteractionRequest request, StreamObserver<CreateInteractionResponse> responseObserver) {
        var dto = new CreateInteractionCommand.CreateInteractionRequest(
                request.getUserId(),
                request.getEventId(),
                request.getViewed(),
                request.getBooked()
        );

        var id = createInteractionCommand.execute(dto);

        var response = CreateInteractionResponse.newBuilder()
                .setId(id.toString())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateInteraction(UpdateInteractionRequest request, StreamObserver<UpdateInteractionResponse> responseObserver) {
        var dto = new UpdateInteractionCommand.UpdateInteractionRequest(
                request.getId(),
                request.getViewed(),
                request.getBooked()
        );

        var id = updateInteractionCommand.execute(dto);

        var response = UpdateInteractionResponse.newBuilder()
                .setId(id.toString())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteInteraction(DeleteInteractionRequest request, StreamObserver<DeleteInteractionResponse> responseObserver) {
        var dto = new DeleteInteractionCommand.DeleteInteractionRequest(
                request.getId()
        );

        var id = deleteInteractionCommand.execute(dto);

        var response = DeleteInteractionResponse.newBuilder()
                .setId(id.toString())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
