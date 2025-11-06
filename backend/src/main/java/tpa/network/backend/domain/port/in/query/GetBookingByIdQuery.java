package tpa.network.backend.domain.port.in.query;

import tpa.network.backend.domain.readmodel.BookingReadModel;

import java.util.Optional;

public interface GetBookingByIdQuery {
    Optional<BookingReadModel> execute(String id);
}
