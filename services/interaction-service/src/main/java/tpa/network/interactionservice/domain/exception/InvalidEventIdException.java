package tpa.network.interactionservice.domain.exception;

public class InvalidEventIdException extends RuntimeException {
    public InvalidEventIdException(String message) {
        super(message);
    }
}
