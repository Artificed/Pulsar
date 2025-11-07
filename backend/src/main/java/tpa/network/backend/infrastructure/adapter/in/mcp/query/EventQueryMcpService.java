package tpa.network.backend.infrastructure.adapter.in.mcp.query;

import lombok.RequiredArgsConstructor;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.port.in.query.GetAllEventsQuery;
import tpa.network.backend.domain.port.in.query.GetEventByIdQuery;
import tpa.network.backend.domain.readmodel.EventReadModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventQueryMcpService {

    private final GetAllEventsQuery getAllEventsQuery;
    private final GetEventByIdQuery getEventByIdQuery;

    @McpTool(description = "Retrieve all events in the system")
    public List<EventReadModel> getAllEvents() {
        return getAllEventsQuery.execute();
    }

    @McpTool(description = "Retrieve a specific event by its ID")
    public EventReadModel getEventById(String eventId) {
        return getEventByIdQuery.execute(new GetEventByIdQuery.GetEventByIdRequest(eventId));
    }
}
