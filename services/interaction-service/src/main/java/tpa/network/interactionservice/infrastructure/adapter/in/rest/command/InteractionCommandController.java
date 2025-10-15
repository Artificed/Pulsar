package tpa.network.interactionservice.infrastructure.adapter.in.rest.command;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.interactionservice.domain.port.in.command.CreateInteractionCommand;
import tpa.network.interactionservice.domain.port.in.command.DeleteInteractionCommand;
import tpa.network.interactionservice.domain.port.in.command.UpdateInteractionCommand;
import tpa.network.interactionservice.infrastructure.adapter.in.rest.command.dto.*;

@RestController
@RequestMapping("/interactions")
@RequiredArgsConstructor
public class InteractionCommandController {
    private final CreateInteractionCommand createInteractionCommand;
    private final UpdateInteractionCommand updateInteractionCommand;
    private final DeleteInteractionCommand deleteInteractionCommand;

    @PostMapping
    public ResponseEntity<CreateInteractionResponse> createInteraction(
            @RequestBody @Valid CreateInteractionRequest createInteractionRequest
    ) {
        var id = createInteractionCommand.execute(
                new CreateInteractionCommand.CreateInteractionRequest(
                        createInteractionRequest.userId(),
                        createInteractionRequest.eventId(),
                        createInteractionRequest.viewed(),
                        createInteractionRequest.booked()
                )
        );

        var response = new CreateInteractionResponse(id.getValue());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<UpdateInteractionResponse> updateInteraction(
            @RequestBody @Valid UpdateInteractionRequest updateInteractionRequest
    ) {
        var id = updateInteractionCommand.execute(
                new UpdateInteractionCommand.UpdateInteractionRequest(
                        updateInteractionRequest.id(),
                        updateInteractionRequest.viewed(),
                        updateInteractionRequest.booked()
                )
        );

        var response = new UpdateInteractionResponse(id.getValue());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<DeleteInteractionResponse> deleteInteraction(
            @RequestBody @Valid DeleteInteractionRequest deleteInteractionRequest
    ) {
        var id = deleteInteractionCommand.execute(
                new DeleteInteractionCommand.DeleteInteractionRequest(
                        deleteInteractionRequest.id()
                )
        );

        var response = new DeleteInteractionResponse(id.getValue());
        return ResponseEntity.ok(response);
    }
}
