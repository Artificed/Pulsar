package tpa.network.interactionservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.interactionservice.application.mapper.InteractionMapper;
import tpa.network.interactionservice.domain.port.in.query.GetInteractionsByEventIdQuery;
import tpa.network.interactionservice.domain.port.out.query.InteractionQueryRepositoryPort;
import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetInteractionsByEventIdQueryHandler implements GetInteractionsByEventIdQuery {
    private final InteractionQueryRepositoryPort queryRepository;
    private final InteractionMapper mapper;

    @Override
    public List<InteractionReadModel> execute(GetInteractionsByEventIdRequest request) {
        // TODO: Optionally validate that eventId exists in event-service
        
        return queryRepository.findByEventId(request.eventId())
                .stream()
                .map(mapper::toReadModel)
                .collect(Collectors.toList());
    }
}
