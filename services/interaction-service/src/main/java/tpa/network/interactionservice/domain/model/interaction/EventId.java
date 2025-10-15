package tpa.network.interactionservice.domain.model.interaction;

import lombok.Value;
import tpa.network.interactionservice.domain.exception.InvalidEventIdException;

@Value
public class EventId {
    String value;

    public static EventId fromString(String value) {
        validate(value);
        return new EventId(value);
    }

    private static void validate(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new InvalidEventIdException("Event ID cannot be null or empty!");
        }
    }
}
