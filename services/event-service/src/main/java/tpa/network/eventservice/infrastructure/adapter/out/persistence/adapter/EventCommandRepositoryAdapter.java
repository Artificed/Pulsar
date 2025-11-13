package tpa.network.eventservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.model.shared.Id;
import tpa.network.eventservice.domain.port.out.command.EventCommandRepositoryPort;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mapper.EventPersistenceMapper;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.repository.EventRepository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EventCommandRepositoryAdapter implements EventCommandRepositoryPort {
    private final EventRepository repository;
    private final EventPersistenceMapper mapper;

    @Override
    public Event insert(Event event) {
        log.debug("Inserting event into database with id: {}", event.getId().getValue());
        
        var eventDocument = mapper.toDocument(event);
        var insertedEvent = repository.save(eventDocument);
        
        log.debug("Successfully inserted event with id: {}", insertedEvent.getId());
        return mapper.toEvent(insertedEvent);
    }

    @Override
    public Id deleteById(String id) {
        log.debug("Deleting event from database with id: {}", id);
        
        repository.deleteById(id);
        
        log.debug("Successfully deleted event with id: {}", id);
        return Id.fromString(id);
    }
}
