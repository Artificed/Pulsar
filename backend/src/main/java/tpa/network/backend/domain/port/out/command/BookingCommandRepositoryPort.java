package tpa.network.backend.domain.port.out.command;

import tpa.network.backend.domain.model.booking.Booking;
import tpa.network.backend.domain.model.shared.Id;

public interface BookingCommandRepositoryPort {
    Booking insert(Booking booking);
    Booking update(Booking booking);
    Id deleteById(String id);
}
