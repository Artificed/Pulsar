package tpa.network.backend.domain.model.event;

import lombok.Value;
import tpa.network.backend.domain.exception.InvalidDateTimeException;

import java.time.LocalDateTime;

@Value
public class EventDateTime {
    LocalDateTime value;

    public static EventDateTime fromLocalDateTime(LocalDateTime value) {
        validate(value);
        return new EventDateTime(value);
    }

    private static void validate(LocalDateTime value) {
        if (value == null) {
            throw new InvalidDateTimeException("Event date and time cannot be null!");
        }
        
        if (value.isBefore(LocalDateTime.now())) {
            throw new InvalidDateTimeException("Event date and time cannot be in the past!");
        }
    }
}
