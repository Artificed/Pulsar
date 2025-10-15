package tpa.network.interactionservice.infrastructure.adapter.out.persistence.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tpa.network.interactionservice.domain.exception.InteractionNotFoundException;
import tpa.network.interactionservice.infrastructure.adapter.out.persistence.mongodb.document.InteractionDocument;

import java.util.List;

@Repository
public interface InteractionRepository extends MongoRepository<InteractionDocument, String> {
    
    List<InteractionDocument> findByUserId(String userId);
    
    List<InteractionDocument> findByEventId(String eventId);
    
    default InteractionDocument updateInteraction(InteractionDocument interaction) {
        assert interaction.getId() != null;

        InteractionDocument existing = findById(interaction.getId())
                .orElseThrow(InteractionNotFoundException::new);

        existing.setViewed(interaction.isViewed());
        existing.setBooked(interaction.isBooked());

        return save(existing);
    }
}
