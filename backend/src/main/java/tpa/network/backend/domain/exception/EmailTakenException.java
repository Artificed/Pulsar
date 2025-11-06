package tpa.network.backend.domain.exception;

public class EmailTakenException extends RuntimeException {
    public EmailTakenException() {
        super("Email is already taken");
    }
}
