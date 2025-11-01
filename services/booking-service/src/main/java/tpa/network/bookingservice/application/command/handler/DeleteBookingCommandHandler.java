package tpa.network.bookingservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.in.command.DeleteBookingCommand;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;

@Service
@RequiredArgsConstructor
public class DeleteBookingCommandHandler implements DeleteBookingCommand {
    private final BookingCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteBookingRequest request) {
        return commandRepository.deleteById(request.id());
    }
}
