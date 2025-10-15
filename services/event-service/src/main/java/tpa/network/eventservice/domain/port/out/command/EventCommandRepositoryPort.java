package tpa.network.eventservice.domain.port.out.command;

import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.model.shared.Id;

public interface EventCommandRepositoryPort {
    Event insert(Event event);
    Id deleteById(String id);
}
