package tpa.network.interactionservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.interactionservice.domain.model.interaction.Interaction;
import tpa.network.interactionservice.domain.model.shared.Id;
import tpa.network.interactionservice.domain.port.out.command.InteractionCommandRepositoryPort;
import tpa.network.interactionservice.infrastructure.adapter.out.persistence.mapper.InteractionPersistenceMapper;
import tpa.network.interactionservice.infrastructure.adapter.out.persistence.mongodb.repository.InteractionRepository;

@Repository
@RequiredArgsConstructor
public class InteractionCommandRepositoryAdapter implements InteractionCommandRepositoryPort {
    private final InteractionRepository repository;
    private final InteractionPersistenceMapper mapper;

    @Override
    public Interaction insert(Interaction interaction) {
        var interactionDocument = mapper.toDocument(interaction);
        var insertedInteraction = repository.save(interactionDocument);
        return mapper.toInteraction(insertedInteraction);
    }

    @Override
    public Interaction update(Interaction interaction) {
        var interactionDocument = mapper.toDocument(interaction);
        var updatedInteraction = repository.updateInteraction(interactionDocument);
        return mapper.toInteraction(updatedInteraction);
    }

    @Override
    public Id deleteById(String id) {
        repository.deleteById(id);
        return Id.fromString(id);
    }
}
