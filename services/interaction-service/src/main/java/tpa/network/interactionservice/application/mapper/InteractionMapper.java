package tpa.network.interactionservice.application.mapper;

import org.springframework.stereotype.Component;
import tpa.network.interactionservice.domain.model.interaction.Interaction;
import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

@Component
public class InteractionMapper {

    public InteractionReadModel toReadModel(Interaction interaction) {
        return new InteractionReadModel(
                interaction.getId().getValue(),
                interaction.getUserId().getValue(),
                interaction.getEventId().getValue(),
                interaction.getViewed().isValue(),
                interaction.getBooked().isValue()
        );
    }
}
