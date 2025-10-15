package tpa.network.interactionservice.domain.port.out.command;

import tpa.network.interactionservice.domain.model.interaction.Interaction;
import tpa.network.interactionservice.domain.model.shared.Id;

public interface InteractionCommandRepositoryPort {
    Interaction insert(Interaction interaction);
    Interaction update(Interaction interaction);
    Id deleteById(String id);
}
