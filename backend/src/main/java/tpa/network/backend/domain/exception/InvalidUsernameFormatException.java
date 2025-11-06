package tpa.network.backend.domain.exception;

public class InvalidUsernameFormatException extends RuntimeException {
    public InvalidUsernameFormatException(String message) {
        super(message);
    }
}
