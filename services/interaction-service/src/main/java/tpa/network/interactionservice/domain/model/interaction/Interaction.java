package tpa.network.interactionservice.domain.model.interaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import tpa.network.interactionservice.domain.model.shared.Id;

@Data
@AllArgsConstructor
public class Interaction {

    @org.springframework.data.annotation.Id
    private Id id;

    private UserId userId;
    private EventId eventId;
    private Viewed viewed;
    private Booked booked;

    public static Interaction create(
            String userId,
            String eventId,
            boolean viewed,
            boolean booked
    ) {
        return new Interaction(
                Id.generate(),
                UserId.fromString(userId),
                EventId.fromString(eventId),
                Viewed.fromBoolean(viewed),
                Booked.fromBoolean(booked)
        );
    }
}
