package tpa.network.bookingservice.infrastructure.adapter.in.grpc.command;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.bookingservice.*;
import tpa.network.bookingservice.domain.port.in.command.CreateBookingCommand;
import tpa.network.bookingservice.domain.port.in.command.DeleteBookingCommand;

@GrpcService
@RequiredArgsConstructor
public class BookingCommandGrpcService extends BookingCommandServiceGrpc.BookingCommandServiceImplBase {

    private final CreateBookingCommand createBookingCommand;
    private final DeleteBookingCommand deleteBookingCommand;

    @Override
    public void createBooking(CreateBookingRequest request, StreamObserver<CreateBookingResponse> responseObserver) {
        var dto = new CreateBookingCommand.CreateBookingRequest(
                request.getUserId(), request.getEventId(), request.getQuantity()
        );

        var id = createBookingCommand.execute(dto);

        var response = CreateBookingResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteBooking(DeleteBookingRequest request, StreamObserver<DeleteBookingResponse> responseObserver) {
        var dto = new DeleteBookingCommand.DeleteBookingRequest(
                request.getId()
        );

        var id = deleteBookingCommand.execute(dto);

        var response = DeleteBookingResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
