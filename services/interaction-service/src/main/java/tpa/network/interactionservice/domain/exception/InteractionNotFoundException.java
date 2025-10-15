package tpa.network.interactionservice.domain.exception;

public class InteractionNotFoundException extends RuntimeException {
    public InteractionNotFoundException() {
        super("Interaction not found!");
    }

    public InteractionNotFoundException(String message) {
        super(message);
    }
}
