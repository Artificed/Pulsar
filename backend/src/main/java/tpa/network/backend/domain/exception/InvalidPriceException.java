package tpa.network.backend.domain.exception;

public class InvalidPriceException extends RuntimeException {
    public InvalidPriceException() {
        super("Price cannot be negative!");
    }
}
