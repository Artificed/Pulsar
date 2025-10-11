package tpa.network.userservice.domain.port.out.command;

import org.springframework.stereotype.Repository;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;

@Repository
public interface UserCommandRepositoryPort {
    User create(User user);
    Id update(String id, String username);
    Id deleteById(String id);
}
