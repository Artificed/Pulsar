package tpa.network.eventservice.infrastructure.adapter.in.grpc.command;

import com.google.protobuf.Timestamp;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.eventservice.*;
import tpa.network.eventservice.domain.port.in.command.CreateEventCommand;
import tpa.network.eventservice.domain.port.in.command.DeleteEventCommand;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@GrpcService
@RequiredArgsConstructor
public class EventCommandGrpcService extends EventCommandServiceGrpc.EventCommandServiceImplBase {

    private final CreateEventCommand createEventCommand;
    private final DeleteEventCommand deleteEventCommand;

    @Override
    public void createEvent(CreateEventRequest request, StreamObserver<CreateEventResponse> responseObserver) {
        Timestamp timestamp = request.getDatetime();
        LocalDateTime datetime = LocalDateTime.ofInstant(
                Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos()),
                ZoneOffset.UTC
        );

        var dto = new CreateEventCommand.CreateEventRequest(
                request.getTitle(),
                request.getDescription(),
                request.getImageUrl(),
                datetime.toString(),
                request.getDurationMinutes(),
                request.getLocation(),
                request.getPrice(),
                request.getCapacity()
        );

        var id = createEventCommand.execute(dto);

        var response = CreateEventResponse.newBuilder()
                .setId(id.toString())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteEvent(DeleteEventRequest request, StreamObserver<DeleteEventResponse> responseObserver) {
        var dto = new DeleteEventCommand.DeleteEventRequest(
                request.getId()
        );

        var id = deleteEventCommand.execute(dto);

        var response = DeleteEventResponse.newBuilder()
                .setId(id.toString())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
