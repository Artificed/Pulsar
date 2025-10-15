package tpa.network.interactionservice.domain.model.interaction;

import lombok.Value;

@Value
public class Booked {
    boolean value;

    public static Booked fromBoolean(boolean value) {
        return new Booked(value);
    }
}
