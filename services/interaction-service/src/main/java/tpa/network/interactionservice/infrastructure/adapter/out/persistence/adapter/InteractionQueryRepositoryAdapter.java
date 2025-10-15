package tpa.network.interactionservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.interactionservice.domain.model.interaction.Interaction;
import tpa.network.interactionservice.domain.port.out.query.InteractionQueryRepositoryPort;
import tpa.network.interactionservice.infrastructure.adapter.out.persistence.mapper.InteractionPersistenceMapper;
import tpa.network.interactionservice.infrastructure.adapter.out.persistence.mongodb.repository.InteractionRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class InteractionQueryRepositoryAdapter implements InteractionQueryRepositoryPort {
    private final InteractionRepository repository;
    private final InteractionPersistenceMapper mapper;

    @Override
    public List<Interaction> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toInteraction)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Interaction> findById(String id) {
        return repository.findById(id)
                .map(mapper::toInteraction);
    }

    @Override
    public List<Interaction> findByUserId(String userId) {
        return repository.findByUserId(userId)
                .stream()
                .map(mapper::toInteraction)
                .collect(Collectors.toList());
    }

    @Override
    public List<Interaction> findByEventId(String eventId) {
        return repository.findByEventId(eventId)
                .stream()
                .map(mapper::toInteraction)
                .collect(Collectors.toList());
    }
}
