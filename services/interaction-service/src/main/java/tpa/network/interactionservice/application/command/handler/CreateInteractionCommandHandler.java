package tpa.network.interactionservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.interactionservice.domain.model.interaction.Interaction;
import tpa.network.interactionservice.domain.model.shared.Id;
import tpa.network.interactionservice.domain.port.in.command.CreateInteractionCommand;
import tpa.network.interactionservice.domain.port.out.command.InteractionCommandRepositoryPort;

@Service
@RequiredArgsConstructor
public class CreateInteractionCommandHandler implements CreateInteractionCommand {
    private final InteractionCommandRepositoryPort commandRepository;

    @Override
    public Id execute(CreateInteractionRequest request) {
        // TODO: Validate that userId exists in user-service before creating interaction
        // TODO: Validate that eventId exists in event-service before creating interaction
        
        Interaction interaction = Interaction.create(
                request.userId(),
                request.eventId(),
                request.viewed(),
                request.booked()
        );

        Interaction savedInteraction = commandRepository.insert(interaction);
        return savedInteraction.getId();
    }
}
