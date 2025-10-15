package tpa.network.interactionservice.infrastructure.adapter.in.rest.query;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.interactionservice.domain.port.in.query.*;
import tpa.network.interactionservice.infrastructure.adapter.in.rest.query.dto.InteractionResponse;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/interactions")
@RequiredArgsConstructor
public class InteractionQueryController {
    private final GetAllInteractionsQuery getAllInteractionsQuery;
    private final GetInteractionByIdQuery getInteractionByIdQuery;
    private final GetInteractionsByUserIdQuery getInteractionsByUserIdQuery;
    private final GetInteractionsByEventIdQuery getInteractionsByEventIdQuery;

    @GetMapping
    public ResponseEntity<List<InteractionResponse>> getAllInteractions() {
        var interactions = getAllInteractionsQuery.execute();
        
        var response = interactions.stream()
                .map(interaction -> new InteractionResponse(
                        interaction.getId(),
                        interaction.getUserId(),
                        interaction.getEventId(),
                        interaction.isViewed(),
                        interaction.isBooked()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InteractionResponse> getInteractionById(@PathVariable String id) {
        var interaction = getInteractionByIdQuery.execute(
                new GetInteractionByIdQuery.GetInteractionByIdRequest(id)
        );

        var response = new InteractionResponse(
                interaction.getId(),
                interaction.getUserId(),
                interaction.getEventId(),
                interaction.isViewed(),
                interaction.isBooked()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InteractionResponse>> getInteractionsByUserId(@PathVariable String userId) {
        var interactions = getInteractionsByUserIdQuery.execute(
                new GetInteractionsByUserIdQuery.GetInteractionsByUserIdRequest(userId)
        );

        var response = interactions.stream()
                .map(interaction -> new InteractionResponse(
                        interaction.getId(),
                        interaction.getUserId(),
                        interaction.getEventId(),
                        interaction.isViewed(),
                        interaction.isBooked()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<InteractionResponse>> getInteractionsByEventId(@PathVariable String eventId) {
        var interactions = getInteractionsByEventIdQuery.execute(
                new GetInteractionsByEventIdQuery.GetInteractionsByEventIdRequest(eventId)
        );

        var response = interactions.stream()
                .map(interaction -> new InteractionResponse(
                        interaction.getId(),
                        interaction.getUserId(),
                        interaction.getEventId(),
                        interaction.isViewed(),
                        interaction.isBooked()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
