package tpa.network.bookingservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.exception.BookingNotFoundException;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.booking.EventId;
import tpa.network.bookingservice.domain.model.booking.Quantity;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.in.command.UpdateBookingCommand;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;

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
                tpa.network.bookingservice.domain.model.booking.UserId.fromString(bookingReadModel.userId()),
                EventId.fromString(request.eventId()),
                Quantity.fromInt(request.quantity())
        );

        Booking updatedBooking = commandRepository.update(booking);
        return updatedBooking.getId();
    }
}
