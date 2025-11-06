package tpa.network.backend.domain.model.event;

import lombok.Value;
import tpa.network.backend.domain.exception.InvalidCapacityException;

@Value
public class Capacity {
    int value;

    public static Capacity fromInt(int value) {
        validate(value);
        return new Capacity(value);
    }

    private static void validate(int value) {
        if (value <= 0) {
            throw new InvalidCapacityException();
        }
    }
}
