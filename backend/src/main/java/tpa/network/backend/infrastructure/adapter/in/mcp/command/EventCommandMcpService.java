package tpa.network.backend.infrastructure.adapter.in.mcp.command;

import lombok.RequiredArgsConstructor;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.port.in.command.CreateEventCommand;
import tpa.network.backend.domain.port.in.command.DeleteEventCommand;

@Service
@RequiredArgsConstructor
public class EventCommandMcpService {

    private final CreateEventCommand createEventCommand;
    private final DeleteEventCommand deleteEventCommand;

    @McpTool(description = "Create a new event with title, description, image URL, datetime, duration, location, price, and capacity")
    public String createEvent(String title, String description, String imageUrl, String datetime,
                              int durationMinutes, String location, double price, int capacity) {

        var request = new CreateEventCommand.CreateEventRequest(
            title, description, imageUrl, datetime,
            durationMinutes, location, price, capacity
        );
        var eventId = createEventCommand.execute(request);
        return eventId.getValue();
    }

    @McpTool(description = "Delete an event by its ID")
    public String deleteEvent(String eventId) {
        var request = new DeleteEventCommand.DeleteEventRequest(eventId);
        var deletedId = deleteEventCommand.execute(request);
        return deletedId.getValue();
    }
}
