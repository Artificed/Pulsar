package tpa.network.backend.application.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.application.mapper.EventMapper;
import tpa.network.backend.domain.exception.EventNotFoundException;
import tpa.network.backend.domain.port.in.query.GetEventByIdQuery;
import tpa.network.backend.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.backend.domain.readmodel.EventReadModel;

@Service
@RequiredArgsConstructor
public class GetEventByIdQueryHandler implements GetEventByIdQuery {
    private final EventQueryRepositoryPort queryRepository;
    private final EventMapper mapper;

    @Override
    public EventReadModel execute(GetEventByIdRequest request) {
        var event = queryRepository.findById(request.eventId())
                .orElseThrow(EventNotFoundException::new);

        return mapper.toReadModel(event);
    }
}
