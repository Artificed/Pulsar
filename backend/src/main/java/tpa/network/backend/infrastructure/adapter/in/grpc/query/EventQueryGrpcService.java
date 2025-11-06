package tpa.network.backend.infrastructure.adapter.in.grpc.query;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.backend.*;
import tpa.network.backend.domain.port.in.query.GetAllEventsQuery;
import tpa.network.backend.domain.port.in.query.GetEventByIdQuery;
import tpa.network.backend.infrastructure.adapter.in.grpc.mapper.EventGrpcMapper;

@GrpcService
@RequiredArgsConstructor
public class EventQueryGrpcService extends EventQueryServiceGrpc.EventQueryServiceImplBase {

    private final GetAllEventsQuery getAllEventsQuery;
    private final GetEventByIdQuery getEventByIdQuery;

    private final EventGrpcMapper eventGrpcMapper;

    @Override
    public void getAllEvents(GetAllEventsRequest request, StreamObserver<GetAllEventsResponse> responseObserver) {
        var events = getAllEventsQuery.execute();

        var response = GetAllEventsResponse.newBuilder()
                .addAllEvents(events.stream().map(eventGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getEventById(GetEventByIdRequest request, StreamObserver<GetEventByIdResponse> responseObserver) {
        var dto = new GetEventByIdQuery.GetEventByIdRequest(request.getId());
        var event = getEventByIdQuery.execute(dto);

        var responseBuilder = GetEventByIdResponse.newBuilder();
        if (event != null) {
            responseBuilder.setEvent(eventGrpcMapper.toProto(event));
        }

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
