package tpa.network.backend.application.command;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.exception.EventNotFoundException;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.port.in.command.DeleteEventCommand;
import tpa.network.backend.domain.port.out.command.EventCommandRepositoryPort;
import tpa.network.backend.domain.port.out.query.EventQueryRepositoryPort;

@Service
@AllArgsConstructor
public class DeleteEventCommandHandler implements DeleteEventCommand {
    private final EventQueryRepositoryPort queryRepository;
    private final EventCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteEventRequest request) {
        if (queryRepository.findById(request.eventId()).isEmpty()) {
            throw new EventNotFoundException();
        }

        return commandRepository.deleteById(request.eventId());
    }
}
