package tpa.network.backend.infrastructure.adapter.in.grpc.mapper;

import org.springframework.stereotype.Component;
import tpa.network.backend.Booking;
import tpa.network.backend.domain.readmodel.BookingReadModel;

@Component
public class BookingGrpcMapper {

    public Booking toProto(BookingReadModel booking) {
        return Booking.newBuilder()
                .setId(booking.id())
                .setUserId(booking.userId())
                .setEventId(booking.eventId())
                .setQuantity(booking.quantity())
                .build();
    }
}
