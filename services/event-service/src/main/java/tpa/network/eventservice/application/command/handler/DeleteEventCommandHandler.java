package tpa.network.eventservice.application.command.handler;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.domain.exception.EventNotFoundException;
import tpa.network.eventservice.domain.model.shared.Id;
import tpa.network.eventservice.domain.port.in.command.DeleteEventCommand;
import tpa.network.eventservice.domain.port.out.command.EventCommandRepositoryPort;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;

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
