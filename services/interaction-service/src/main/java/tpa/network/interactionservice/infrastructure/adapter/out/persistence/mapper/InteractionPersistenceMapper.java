package tpa.network.interactionservice.infrastructure.adapter.out.persistence.mapper;

import org.springframework.stereotype.Component;
import tpa.network.interactionservice.domain.model.interaction.*;
import tpa.network.interactionservice.domain.model.shared.Id;
import tpa.network.interactionservice.infrastructure.adapter.out.persistence.mongodb.document.InteractionDocument;

@Component
public class InteractionPersistenceMapper {

    public InteractionDocument toDocument(Interaction interaction) {
        return new InteractionDocument(
                interaction.getId().getValue(),
                interaction.getUserId().getValue(),
                interaction.getEventId().getValue(),
                interaction.getViewed().isValue(),
                interaction.getBooked().isValue()
        );
    }

    public Interaction toInteraction(InteractionDocument interactionDocument) {
        return new Interaction(
                Id.fromString(interactionDocument.getId()),
                UserId.fromString(interactionDocument.getUserId()),
                EventId.fromString(interactionDocument.getEventId()),
                Viewed.fromBoolean(interactionDocument.isViewed()),
                Booked.fromBoolean(interactionDocument.isBooked())
        );
    }
}
