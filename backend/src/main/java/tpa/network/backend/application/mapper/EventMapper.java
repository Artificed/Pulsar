package tpa.network.backend.application.mapper;

import org.springframework.stereotype.Component;
import tpa.network.backend.domain.model.event.Event;
import tpa.network.backend.domain.readmodel.EventReadModel;

@Component
public class EventMapper {

    public EventReadModel toReadModel(Event event) {
        return new EventReadModel(
                event.getId().getValue(),
                event.getTitle().getValue(),
                event.getDescription().getValue(),
                event.getImageUrl(),
                event.getDatetime().getValue(),
                event.getDurationMinutes(),
                event.getLocation().getValue(),
                event.getPrice().getValue(),
                event.getCapacity().getValue(),
                event.getSeatsAvailable()
        );
    }
}
