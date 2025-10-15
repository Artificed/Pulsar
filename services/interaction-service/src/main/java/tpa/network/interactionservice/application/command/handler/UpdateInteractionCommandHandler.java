package tpa.network.interactionservice.application.command.handler;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.interactionservice.domain.exception.InteractionNotFoundException;
import tpa.network.interactionservice.domain.model.interaction.Booked;
import tpa.network.interactionservice.domain.model.interaction.Viewed;
import tpa.network.interactionservice.domain.model.shared.Id;
import tpa.network.interactionservice.domain.port.in.command.UpdateInteractionCommand;
import tpa.network.interactionservice.domain.port.out.command.InteractionCommandRepositoryPort;
import tpa.network.interactionservice.domain.port.out.query.InteractionQueryRepositoryPort;

@Service
@AllArgsConstructor
public class UpdateInteractionCommandHandler implements UpdateInteractionCommand {
    private final InteractionQueryRepositoryPort queryRepository;
    private final InteractionCommandRepositoryPort commandRepository;

    @Override
    public Id execute(UpdateInteractionRequest request) {
        var interactionResult = queryRepository.findById(request.interactionId());

        if (interactionResult.isEmpty()) {
            throw new InteractionNotFoundException();
        }

        var interaction = interactionResult.get();
        
        interaction.setViewed(Viewed.fromBoolean(request.viewed()));
        interaction.setBooked(Booked.fromBoolean(request.booked()));

        return commandRepository.update(interaction).getId();
    }
}
