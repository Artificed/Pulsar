package tpa.network.userservice.application.command.handler;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.userservice.domain.exception.UserNotFoundException;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.Username;
import tpa.network.userservice.domain.port.in.command.UpdateUserCommand;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;

@Service
@AllArgsConstructor
public class UpdateUserCommandHandler implements UpdateUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(UpdateUserRequest request) {
        var userResult = queryRepository.findById(request.userId());

        if (userResult.isEmpty()) {
            throw new UserNotFoundException("User Not Found");
        }

        var user = userResult.get();
        var newUsername = Username.fromString(request.username());

        user.setUsername(newUsername);

        return commandRepository.save(user).getId();
    }
}
