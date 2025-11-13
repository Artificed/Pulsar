package tpa.network.eventservice.infrastructure.adapter.in.mcp.query;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.domain.port.in.query.GetAllEventsQuery;
import tpa.network.eventservice.domain.port.in.query.GetEventByIdQuery;
import tpa.network.eventservice.domain.readmodel.EventReadModel;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventQueryMcpService {

    private final GetAllEventsQuery getAllEventsQuery;
    private final GetEventByIdQuery getEventByIdQuery;

    @McpTool(description = "Retrieve all events in the system")
    public List<EventReadModel> getAllEvents() {
        log.info("MCP - Received getAllEvents request");
        var events = getAllEventsQuery.execute();
        log.info("MCP - Found {} events", events.size());
        return events;
    }

    @McpTool(description = "Retrieve a specific event by its ID")
    public EventReadModel getEventById(String eventId) {
        log.info("MCP - Received getEventById request for id: {}", eventId);
        var event = getEventByIdQuery.execute(new GetEventByIdQuery.GetEventByIdRequest(eventId));
        log.info("MCP - Found event with id: {}", eventId);
        return event;
    }
}
