package tpa.network.backend.domain.port.in.query;

import tpa.network.backend.domain.readmodel.BookingReadModel;

import java.util.List;

public interface GetAllBookingsQuery {
    List<BookingReadModel> execute();
}
