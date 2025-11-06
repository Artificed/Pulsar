package tpa.network.backend.application.command;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.exception.UserNotFoundException;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.model.user.Username;
import tpa.network.backend.domain.port.in.command.UpdateUserCommand;
import tpa.network.backend.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.backend.domain.port.out.query.UserQueryRepositoryPort;

@Service
@AllArgsConstructor
public class UpdateUserCommandHandler implements UpdateUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(UpdateUserRequest request) {
        var userResult = queryRepository.findById(request.userId());

        if (userResult.isEmpty()) {
            throw new UserNotFoundException();
        }

        var user = userResult.get();
        var newUsername = Username.fromString(request.username());

        user.setUsername(newUsername);

        return commandRepository.update(user).getId();
    }
}
