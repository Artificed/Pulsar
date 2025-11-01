package tpa.network.bookingservice.infrastructure.adapter.in.rest.command;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.bookingservice.domain.port.in.command.CreateBookingCommand;
import tpa.network.bookingservice.domain.port.in.command.DeleteBookingCommand;
import tpa.network.bookingservice.domain.port.in.command.UpdateBookingCommand;
import tpa.network.bookingservice.infrastructure.adapter.in.rest.command.dto.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingCommandController {

    private final CreateBookingCommand createBookingCommand;
    private final UpdateBookingCommand updateBookingCommand;
    private final DeleteBookingCommand deleteBookingCommand;

    @PostMapping
    public ResponseEntity<CreateBookingResponse> createBooking(@RequestBody CreateBookingRequest request) {
        var dto = new CreateBookingCommand.CreateBookingRequest(
                request.userId(), request.eventId(), request.quantity()
        );

        var id = createBookingCommand.execute(dto);
        return ResponseEntity.ok(new CreateBookingResponse(id.getValue()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateBookingResponse> updateBooking(
            @PathVariable String id,
            @RequestBody UpdateBookingRequest request) {
        var dto = new UpdateBookingCommand.UpdateBookingRequest(
                id, request.eventId(), request.quantity()
        );

        var bookingId = updateBookingCommand.execute(dto);
        return ResponseEntity.ok(new UpdateBookingResponse(bookingId.getValue()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteBookingResponse> deleteBooking(@PathVariable String id) {
        var dto = new DeleteBookingCommand.DeleteBookingRequest(id);

        var bookingId = deleteBookingCommand.execute(dto);
        return ResponseEntity.ok(new DeleteBookingResponse(bookingId.getValue()));
    }
}
