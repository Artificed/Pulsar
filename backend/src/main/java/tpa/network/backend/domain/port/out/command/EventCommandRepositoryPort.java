package tpa.network.backend.domain.port.out.command;

import tpa.network.backend.domain.model.event.Event;
import tpa.network.backend.domain.model.shared.Id;

public interface EventCommandRepositoryPort {
    Event insert(Event event);
    Id deleteById(String id);
}
