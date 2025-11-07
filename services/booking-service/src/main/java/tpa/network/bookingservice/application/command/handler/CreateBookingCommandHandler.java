package tpa.network.bookingservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.in.command.CreateBookingCommand;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;

@Service
@RequiredArgsConstructor
public class CreateBookingCommandHandler implements CreateBookingCommand {
    private final BookingCommandRepositoryPort commandRepository;

    @Override
    public Id execute(CreateBookingRequest request) {
        Booking booking = Booking.create(
                request.userId(),
                request.eventId(),
                request.quantity()
        );

        Booking savedBooking = commandRepository.insert(booking);
        return savedBooking.getId();
    }
}
