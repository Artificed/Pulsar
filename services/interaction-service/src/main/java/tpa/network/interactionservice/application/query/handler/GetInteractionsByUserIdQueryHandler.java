package tpa.network.interactionservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.interactionservice.application.mapper.InteractionMapper;
import tpa.network.interactionservice.domain.port.in.query.GetInteractionsByUserIdQuery;
import tpa.network.interactionservice.domain.port.out.query.InteractionQueryRepositoryPort;
import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetInteractionsByUserIdQueryHandler implements GetInteractionsByUserIdQuery {
    private final InteractionQueryRepositoryPort queryRepository;
    private final InteractionMapper mapper;

    @Override
    public List<InteractionReadModel> execute(GetInteractionsByUserIdRequest request) {
        // TODO: Optionally validate that userId exists in user-service
        
        return queryRepository.findByUserId(request.userId())
                .stream()
                .map(mapper::toReadModel)
                .collect(Collectors.toList());
    }
}
