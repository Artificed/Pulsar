package tpa.network.eventservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.model.shared.Id;
import tpa.network.eventservice.domain.port.out.command.EventCommandRepositoryPort;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mapper.EventPersistenceMapper;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.repository.EventRepository;

@Repository
@RequiredArgsConstructor
public class EventCommandRepositoryAdapter implements EventCommandRepositoryPort {
    private final EventRepository repository;
    private final EventPersistenceMapper mapper;

    @Override
    public Event insert(Event event) {
        var eventDocument = mapper.toDocument(event);
        var insertedEvent = repository.save(eventDocument);
        return mapper.toEvent(insertedEvent);
    }

    @Override
    public Id deleteById(String id) {
        repository.deleteById(id);
        return Id.fromString(id);
    }
}
