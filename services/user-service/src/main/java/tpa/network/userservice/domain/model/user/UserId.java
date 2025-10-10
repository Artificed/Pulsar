package tpa.network.userservice.domain.model.user;

import lombok.Value;
import org.bson.types.ObjectId;

@Value
public class UserId {
    String value;

    public static UserId generate() {
        return new UserId(new ObjectId().toString());
    }

    public static UserId fromString(String value) {
        return new UserId(value);
    }
}