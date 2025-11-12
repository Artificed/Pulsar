package tpa.network.bookingservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.exception.EventNotFoundException;
import tpa.network.bookingservice.domain.exception.UserNotFoundException;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.in.command.CreateBookingCommand;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.bookingservice.domain.port.out.grpc.EventServicePort;
import tpa.network.bookingservice.domain.port.out.grpc.UserServicePort;

@Service
@RequiredArgsConstructor
public class CreateBookingCommandHandler implements CreateBookingCommand {
    private final BookingCommandRepositoryPort commandRepository;
    private final UserServicePort userServicePort;
    private final EventServicePort eventServicePort;

    @Override
    public Id execute(CreateBookingRequest request) {
        if (!userServicePort.existsById(request.userId())) {
            throw new UserNotFoundException(request.userId());
        }

        if (!eventServicePort.existsById(request.eventId())) {
            throw new EventNotFoundException(request.eventId());
        }

        Booking booking = Booking.create(
                request.userId(),
                request.eventId(),
                request.quantity()
        );

        Booking savedBooking = commandRepository.insert(booking);
        return savedBooking.getId();
    }
}
