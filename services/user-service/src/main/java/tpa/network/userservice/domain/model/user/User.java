package tpa.network.userservice.domain.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
public class User {

    @Id
    private UserId id;

    private Username username;
    private Email email;
    private Password password;

    public static User create(String username, String email, String password) {
        return new User(
                UserId.generate(),
                Username.fromString(username),
                Email.fromString(email),
                Password.fromString(password)
        );
    }
}