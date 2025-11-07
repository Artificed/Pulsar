package tpa.network.backend.infrastructure.adapter.in.mcp.command;

import lombok.RequiredArgsConstructor;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.port.in.command.CreateBookingCommand;
import tpa.network.backend.domain.port.in.command.DeleteBookingCommand;
import tpa.network.backend.domain.port.in.command.UpdateBookingCommand;

@Service
@RequiredArgsConstructor
public class BookingCommandMcpService {

    private final CreateBookingCommand createBookingCommand;
    private final UpdateBookingCommand updateBookingCommand;
    private final DeleteBookingCommand deleteBookingCommand;

    @McpTool(description = "Create a new booking for a user to attend an event with a specified quantity")
    public String createBooking(String userId, String eventId, int quantity) {
        var request = new CreateBookingCommand.CreateBookingRequest(userId, eventId, quantity);
        var bookingId = createBookingCommand.execute(request);
        return bookingId.getValue();
    }

    @McpTool(description = "Update an existing booking's event and quantity")
    public String updateBooking(String bookingId, String eventId, int quantity) {
        var request = new UpdateBookingCommand.UpdateBookingRequest(bookingId, eventId, quantity);
        var updatedId = updateBookingCommand.execute(request);
        return updatedId.getValue();
    }

    @McpTool(description = "Delete a booking by its ID")
    public String deleteBooking(String bookingId) {
        var request = new DeleteBookingCommand.DeleteBookingRequest(bookingId);
        var deletedId = deleteBookingCommand.execute(request);
        return deletedId.getValue();
    }
}
