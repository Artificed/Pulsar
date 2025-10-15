package tpa.network.interactionservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.interactionservice.application.mapper.InteractionMapper;
import tpa.network.interactionservice.domain.port.in.query.GetAllInteractionsQuery;
import tpa.network.interactionservice.domain.port.out.query.InteractionQueryRepositoryPort;
import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetAllInteractionsQueryHandler implements GetAllInteractionsQuery {
    private final InteractionQueryRepositoryPort queryRepository;
    private final InteractionMapper mapper;

    @Override
    public List<InteractionReadModel> execute() {
        return queryRepository.findAll()
                .stream()
                .map(mapper::toReadModel)
                .collect(Collectors.toList());
    }
}
