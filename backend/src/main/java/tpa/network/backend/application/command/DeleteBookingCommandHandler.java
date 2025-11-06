package tpa.network.backend.application.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.port.in.command.DeleteBookingCommand;
import tpa.network.backend.domain.port.out.command.BookingCommandRepositoryPort;

@Service
@RequiredArgsConstructor
public class DeleteBookingCommandHandler implements DeleteBookingCommand {
    private final BookingCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteBookingRequest request) {
        return commandRepository.deleteById(request.id());
    }
}
