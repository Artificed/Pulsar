package tpa.network.userservice.domain.valueobject;

import lombok.Value;

@Value
public class Password {
    String value;

    public static Password fromString(String value) {
        validate(value);
        return new Password(value);
    }

    private static void validate(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty!");
        }

        String passwordRegex =
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()\\[\\]{}<>])[A-Za-z\\d@$!%*?&#^()\\[\\]{}<>]{8,}$";

        if (!value.matches(passwordRegex)) {
            throw new IllegalArgumentException(
                "Password must be at least 8 characters long, contain uppercase and lowercase letters, " +
                "a number, and a special character!"
            );
        }
    }
}
