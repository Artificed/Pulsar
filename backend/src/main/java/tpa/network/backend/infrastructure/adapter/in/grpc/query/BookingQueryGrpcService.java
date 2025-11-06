package tpa.network.backend.infrastructure.adapter.in.grpc.query;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.backend.*;
import tpa.network.backend.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.backend.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.backend.infrastructure.adapter.in.grpc.mapper.BookingGrpcMapper;

@GrpcService
@RequiredArgsConstructor
public class BookingQueryGrpcService extends BookingQueryServiceGrpc.BookingQueryServiceImplBase {

    private final GetAllBookingsQuery getAllBookingsQuery;
    private final GetBookingByIdQuery getBookingByIdQuery;

    private final BookingGrpcMapper bookingGrpcMapper;

    @Override
    public void getAllBookings(GetAllBookingsRequest request, StreamObserver<GetAllBookingsResponse> responseObserver) {
        var bookings = getAllBookingsQuery.execute();

        var response = GetAllBookingsResponse.newBuilder()
                .addAllBookings(bookings.stream().map(bookingGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getBookingById(GetBookingByIdRequest request, StreamObserver<GetBookingByIdResponse> responseObserver) {
        var booking = getBookingByIdQuery.execute(request.getId());

        var responseBuilder = GetBookingByIdResponse.newBuilder();
        booking.map(bookingGrpcMapper::toProto).ifPresent(responseBuilder::setBooking);

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
