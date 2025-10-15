package tpa.network.interactionservice.domain.model.interaction;

import lombok.Value;
import tpa.network.interactionservice.domain.exception.InvalidUserIdException;

@Value
public class UserId {
    String value;

    public static UserId fromString(String value) {
        validate(value);
        return new UserId(value);
    }

    private static void validate(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new InvalidUserIdException("User ID cannot be null or empty!");
        }
    }
}
