package tpa.network.eventservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.application.mapper.EventMapper;
import tpa.network.eventservice.domain.exception.EventNotFoundException;
import tpa.network.eventservice.domain.port.in.query.GetEventByIdQuery;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.eventservice.domain.readmodel.EventReadModel;

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
