package tpa.network.backend.domain.exception;

public class InvalidCapacityException extends RuntimeException {
    public InvalidCapacityException() {
        super("Capacity must be greater than 0!");
    }
}
