package tpa.network.interactionservice.infrastructure.adapter.in.grpc.mapper;

import org.springframework.stereotype.Component;
import tpa.network.interactionservice.Interaction;
import tpa.network.interactionservice.domain.readmodel.InteractionReadModel;

@Component
public class InteractionGrpcMapper {

    public Interaction toProto(InteractionReadModel model) {
        return Interaction.newBuilder()
                .setId(model.getId())
                .setUserId(model.getUserId())
                .setEventId(model.getEventId())
                .setViewed(model.isViewed())
                .setBooked(model.isBooked())
                .build();
    }
}
