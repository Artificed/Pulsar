package tpa.network.interactionservice.domain.readmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InteractionReadModel {
    private String id;
    private String userId;
    private String eventId;
    private boolean viewed;
    private boolean booked;
}
