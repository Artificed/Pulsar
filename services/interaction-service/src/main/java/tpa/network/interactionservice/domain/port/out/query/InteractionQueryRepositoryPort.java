package tpa.network.interactionservice.domain.port.out.query;

import tpa.network.interactionservice.domain.model.interaction.Interaction;

import java.util.List;
import java.util.Optional;

public interface InteractionQueryRepositoryPort {
    List<Interaction> findAll();
    Optional<Interaction> findById(String id);
    List<Interaction> findByUserId(String userId);
    List<Interaction> findByEventId(String eventId);
}
