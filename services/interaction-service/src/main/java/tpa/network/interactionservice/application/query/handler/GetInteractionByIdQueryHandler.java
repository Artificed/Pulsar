package tpa.network.interactionservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.interactionservice.application.mapper.InteractionMapper;
import tpa.network.interactionservice.domain.exception.InteractionNotFoundException;
import tpa.network.interactionservice.domain.port.in.query.GetInteractionByIdQuery;
import tpa.network.interactionservice.domain.port.out.query.InteractionQueryRepositoryPort;
import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

@Service
@RequiredArgsConstructor
public class GetInteractionByIdQueryHandler implements GetInteractionByIdQuery {
    private final InteractionQueryRepositoryPort queryRepository;
    private final InteractionMapper mapper;

    @Override
    public InteractionReadModel execute(GetInteractionByIdRequest request) {
        var interaction = queryRepository.findById(request.interactionId())
                .orElseThrow(InteractionNotFoundException::new);

        return mapper.toReadModel(interaction);
    }
}
