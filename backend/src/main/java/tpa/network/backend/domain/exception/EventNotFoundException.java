package tpa.network.backend.domain.exception;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException() {
        super("Event not found!");
    }
}
