package tpa.network.backend.application.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.model.event.Event;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.port.in.command.CreateEventCommand;
import tpa.network.backend.domain.port.out.command.EventCommandRepositoryPort;

@Service
@RequiredArgsConstructor
public class CreateEventCommandHandler implements CreateEventCommand {
    private final EventCommandRepositoryPort commandRepository;

    @Override
    public Id execute(CreateEventRequest request) {
        Event event = Event.create(
                request.title(),
                request.description(),
                request.imageUrl(),
                request.datetime(),
                request.durationMinutes(),
                request.location(),
                request.price(),
                request.capacity()
        );

        Event savedEvent = commandRepository.insert(event);
        return savedEvent.getId();
    }
}
