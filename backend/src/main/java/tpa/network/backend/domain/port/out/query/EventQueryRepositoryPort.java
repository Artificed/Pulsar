package tpa.network.backend.domain.port.out.query;

import tpa.network.backend.domain.model.event.Event;

import java.util.List;
import java.util.Optional;

public interface EventQueryRepositoryPort {
    List<Event> findAll();
    Optional<Event> findById(String id);
}
