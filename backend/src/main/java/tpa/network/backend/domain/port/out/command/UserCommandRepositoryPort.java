package tpa.network.backend.domain.port.out.command;

import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.model.user.User;

public interface UserCommandRepositoryPort {
    User insert(User user);
    User update(User user);
    Id deleteById(String id);
}
