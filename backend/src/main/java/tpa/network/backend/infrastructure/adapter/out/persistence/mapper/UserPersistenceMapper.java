package tpa.network.backend.infrastructure.adapter.out.persistence.mapper;

import org.springframework.stereotype.Component;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.model.user.Email;
import tpa.network.backend.domain.model.user.Password;
import tpa.network.backend.domain.model.user.User;
import tpa.network.backend.domain.model.user.Username;
import tpa.network.backend.infrastructure.adapter.out.persistence.mongodb.document.UserDocument;

@Component
public class UserPersistenceMapper {

    public UserDocument toDocument(User user) {
        return new UserDocument(
                user.getId().getValue(),
                user.getUsername().getValue(),
                user.getEmail().getValue(),
                user.getPassword().getValue()
        );
    }

    public User toUser(UserDocument userDocument) {
        return new User(
                Id.fromString(userDocument.getId()),
                Username.fromString(userDocument.getUsername()),
                Email.fromString(userDocument.getEmail()),
                Password.fromString(userDocument.getPassword())
        );
    }

}
