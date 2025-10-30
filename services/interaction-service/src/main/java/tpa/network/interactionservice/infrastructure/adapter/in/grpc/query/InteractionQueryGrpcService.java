package tpa.network.interactionservice.infrastructure.adapter.in.grpc.query;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.interactionservice.*;
import tpa.network.interactionservice.domain.port.in.query.GetAllInteractionsQuery;
import tpa.network.interactionservice.domain.port.in.query.GetInteractionByIdQuery;
import tpa.network.interactionservice.domain.port.in.query.GetInteractionsByUserIdQuery;
import tpa.network.interactionservice.domain.port.in.query.GetInteractionsByEventIdQuery;
import tpa.network.interactionservice.infrastructure.adapter.in.grpc.mapper.InteractionGrpcMapper;

@GrpcService
@RequiredArgsConstructor
public class InteractionQueryGrpcService extends InteractionQueryServiceGrpc.InteractionQueryServiceImplBase {

    private final GetAllInteractionsQuery getAllInteractionsQuery;
    private final GetInteractionByIdQuery getInteractionByIdQuery;
    private final GetInteractionsByUserIdQuery getInteractionsByUserIdQuery;
    private final GetInteractionsByEventIdQuery getInteractionsByEventIdQuery;

    private final InteractionGrpcMapper interactionGrpcMapper;

    @Override
    public void getAllInteractions(GetAllInteractionsRequest request, StreamObserver<GetAllInteractionsResponse> responseObserver) {
        var interactions = getAllInteractionsQuery.execute();

        var response = GetAllInteractionsResponse.newBuilder()
                .addAllInteractions(interactions.stream().map(interactionGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getInteractionById(GetInteractionByIdRequest request, StreamObserver<GetInteractionByIdResponse> responseObserver) {
        var dto = new GetInteractionByIdQuery.GetInteractionByIdRequest(request.getId());
        var interaction = getInteractionByIdQuery.execute(dto);

        var responseBuilder = GetInteractionByIdResponse.newBuilder();
        if (interaction != null) {
            responseBuilder.setInteraction(interactionGrpcMapper.toProto(interaction));
        }

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }

    @Override
    public void getInteractionsByUserId(GetInteractionsByUserIdRequest request, StreamObserver<GetInteractionsByUserIdResponse> responseObserver) {
        var dto = new GetInteractionsByUserIdQuery.GetInteractionsByUserIdRequest(request.getUserId());
        var interactions = getInteractionsByUserIdQuery.execute(dto);

        var response = GetInteractionsByUserIdResponse.newBuilder()
                .addAllInteractions(interactions.stream().map(interactionGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getInteractionsByEventId(GetInteractionsByEventIdRequest request, StreamObserver<GetInteractionsByEventIdResponse> responseObserver) {
        var dto = new GetInteractionsByEventIdQuery.GetInteractionsByEventIdRequest(request.getEventId());
        var interactions = getInteractionsByEventIdQuery.execute(dto);

        var response = GetInteractionsByEventIdResponse.newBuilder()
                .addAllInteractions(interactions.stream().map(interactionGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
