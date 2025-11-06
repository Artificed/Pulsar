package tpa.network.backend.application.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.exception.BookingNotFoundException;
import tpa.network.backend.domain.model.booking.Booking;
import tpa.network.backend.domain.model.booking.Quantity;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.port.in.command.UpdateBookingCommand;
import tpa.network.backend.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.backend.domain.port.out.query.BookingQueryRepositoryPort;

@Service
@RequiredArgsConstructor
public class UpdateBookingCommandHandler implements UpdateBookingCommand {
    private final BookingQueryRepositoryPort queryRepository;
    private final BookingCommandRepositoryPort commandRepository;

    @Override
    public Id execute(UpdateBookingRequest request) {
        var bookingReadModel = queryRepository.findById(request.id())
                .orElseThrow(BookingNotFoundException::new);

        var booking = new Booking(
                Id.fromString(bookingReadModel.id()),
                Id.fromString(bookingReadModel.userId()),
                Id.fromString(request.eventId()),
                Quantity.fromInt(request.quantity())
        );

        Booking updatedBooking = commandRepository.update(booking);
        return updatedBooking.getId();
    }
}
