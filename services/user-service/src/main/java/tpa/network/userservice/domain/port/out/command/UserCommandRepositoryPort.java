package tpa.network.userservice.domain.port.out.command;

import org.springframework.stereotype.Repository;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;

public interface UserCommandRepositoryPort {
    User save(User user);
    Id deleteById(String id);
}
