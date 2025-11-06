package tpa.network.backend.domain.model.booking;

import lombok.AllArgsConstructor;
import lombok.Data;
import tpa.network.backend.domain.model.shared.Id;

@Data
@AllArgsConstructor
public class Booking {

    @org.springframework.data.annotation.Id
    private Id id;

    private Id userId;
    private Id eventId;
    private Quantity quantity;

    public static Booking create(String userId, String eventId, int quantity) {
        return new Booking(
                Id.generate(),
                Id.fromString(userId),
                Id.fromString(eventId),
                Quantity.fromInt(quantity)
        );
    }
}
