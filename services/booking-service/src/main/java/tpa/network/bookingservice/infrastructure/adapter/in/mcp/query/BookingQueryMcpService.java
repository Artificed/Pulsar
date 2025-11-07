package tpa.network.bookingservice.infrastructure.adapter.in.mcp.query;

import lombok.RequiredArgsConstructor;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.bookingservice.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingQueryMcpService {

    private final GetAllBookingsQuery getAllBookingsQuery;
    private final GetBookingByIdQuery getBookingByIdQuery;

    @McpTool(description = "Retrieve all bookings in the system")
    public List<BookingReadModel> getAllBookings() {
        return getAllBookingsQuery.execute();
    }

    @McpTool(description = "Retrieve a specific booking by its ID")
    public BookingReadModel getBookingById(String bookingId) {
        return getBookingByIdQuery.execute(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
    }
}
