package tpa.network.backend.application.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.exception.EventNotFoundException;
import tpa.network.backend.domain.exception.UserNotFoundException;
import tpa.network.backend.domain.model.booking.Booking;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.port.in.command.CreateBookingCommand;
import tpa.network.backend.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.backend.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.backend.domain.port.out.query.UserQueryRepositoryPort;

@Service
@RequiredArgsConstructor
public class CreateBookingCommandHandler implements CreateBookingCommand {
    private final BookingCommandRepositoryPort commandRepository;
    private final UserQueryRepositoryPort userQueryRepository;
    private final EventQueryRepositoryPort eventQueryRepository;

    @Override
    public Id execute(CreateBookingRequest request) {
        if (userQueryRepository.findById(request.userId()).isEmpty()) {
            throw new UserNotFoundException();
        }

        if (eventQueryRepository.findById(request.eventId()).isEmpty()) {
            throw new EventNotFoundException();
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
