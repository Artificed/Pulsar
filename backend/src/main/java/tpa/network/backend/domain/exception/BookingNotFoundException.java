package tpa.network.backend.domain.exception;

public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException() {
        super("Booking not found!");
    }
}
