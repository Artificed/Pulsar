package tpa.network.interactionservice.application.command.handler;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.interactionservice.domain.exception.InteractionNotFoundException;
import tpa.network.interactionservice.domain.model.shared.Id;
import tpa.network.interactionservice.domain.port.in.command.DeleteInteractionCommand;
import tpa.network.interactionservice.domain.port.out.command.InteractionCommandRepositoryPort;
import tpa.network.interactionservice.domain.port.out.query.InteractionQueryRepositoryPort;

@Service
@AllArgsConstructor
public class DeleteInteractionCommandHandler implements DeleteInteractionCommand {
    private final InteractionQueryRepositoryPort queryRepository;
    private final InteractionCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteInteractionRequest request) {
        if (queryRepository.findById(request.interactionId()).isEmpty()) {
            throw new InteractionNotFoundException();
        }

        return commandRepository.deleteById(request.interactionId());
    }
}
