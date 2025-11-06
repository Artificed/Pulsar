package tpa.network.backend.domain.exception;

public class InvalidIdFormatException extends RuntimeException {
    public InvalidIdFormatException(String message) {
        super(message);
    }
}
