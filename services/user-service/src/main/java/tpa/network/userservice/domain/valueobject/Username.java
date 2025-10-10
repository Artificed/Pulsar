package tpa.network.userservice.domain.valueobject;

import lombok.Value;

@Value
public class Username {
    String value;

    public static Username fromString(String value) {
        validate(value);
        return new Username(value);
    }

    private static void validate(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty!");
        }
    }
}
