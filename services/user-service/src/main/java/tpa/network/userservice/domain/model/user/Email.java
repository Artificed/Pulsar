package tpa.network.userservice.domain.model.user;

import lombok.Value;

import java.util.regex.Pattern;

@Value
public class Email {
    String value;

    public static Email fromString(String value) {
        validate(value);
        return new Email(value);
    }

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",
            Pattern.CASE_INSENSITIVE
    );

    private static void validate(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Email value cannot be null or empty!");
        }

        if (!EMAIL_PATTERN.matcher(value).matches()) {
            throw new IllegalArgumentException("Invalid email format: " + value);
        }
    }
}
