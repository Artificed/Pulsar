package tpa.network.eventservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mapper.EventPersistenceMapper;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.repository.EventRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class EventQueryRepositoryAdapter implements EventQueryRepositoryPort {
    private final EventRepository repository;
    private final EventPersistenceMapper mapper;

    @Override
    public List<Event> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toEvent)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Event> findById(String id) {
        return repository.findById(id)
                .map(mapper::toEvent);
    }
}
