package tpa.network.backend.infrastructure.adapter.in.rest.query;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.backend.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.backend.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.backend.infrastructure.adapter.in.rest.query.dto.BookingResponse;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingQueryController {

    private final GetAllBookingsQuery getAllBookingsQuery;
    private final GetBookingByIdQuery getBookingByIdQuery;

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        var bookings = getAllBookingsQuery.execute();
        var response = bookings.stream()
                .map(b -> new BookingResponse(b.id(), b.userId(), b.eventId(), b.quantity()))
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable String id) {
        return getBookingByIdQuery.execute(id)
                .map(b -> new BookingResponse(b.id(), b.userId(), b.eventId(), b.quantity()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
