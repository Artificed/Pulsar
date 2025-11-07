package tpa.network.eventservice.infrastructure.adapter.in.rest.command;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.eventservice.domain.port.in.command.CreateEventCommand;
import tpa.network.eventservice.domain.port.in.command.DeleteEventCommand;
import tpa.network.eventservice.infrastructure.adapter.in.rest.command.dto.*;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventCommandController {
    private final CreateEventCommand createEventCommand;
    private final DeleteEventCommand deleteEventCommand;

    @PostMapping
    public ResponseEntity<CreateEventResponse> createEvent(
            @RequestBody @Valid CreateEventRequest createEventRequest
    ) {
        var id = createEventCommand.execute(
                new CreateEventCommand.CreateEventRequest(
                        createEventRequest.title(),
                        createEventRequest.description(),
                        createEventRequest.imageUrl(),
                        createEventRequest.datetime(),
                        createEventRequest.durationMinutes(),
                        createEventRequest.location(),
                        createEventRequest.price(),
                        createEventRequest.capacity()
                )
        );

        var response = new CreateEventResponse(id.getValue());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping
    public ResponseEntity<DeleteEventResponse> deleteEvent(
            @RequestBody @Valid DeleteEventRequest deleteEventRequest
    ) {
        var id = deleteEventCommand.execute(
                new DeleteEventCommand.DeleteEventRequest(
                        deleteEventRequest.id()
                )
        );

        var response = new DeleteEventResponse(id.getValue());
        return ResponseEntity.ok(response);
    }
}
