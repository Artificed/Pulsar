package tpa.network.interactionservice.domain.model.interaction;

import lombok.Value;

@Value
public class Viewed {
    boolean value;

    public static Viewed fromBoolean(boolean value) {
        return new Viewed(value);
    }
}
