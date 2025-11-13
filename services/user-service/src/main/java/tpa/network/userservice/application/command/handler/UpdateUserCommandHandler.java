package tpa.network.userservice.application.command.handler;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.userservice.domain.exception.UserNotFoundException;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.Username;
import tpa.network.userservice.domain.port.in.command.UpdateUserCommand;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;

@Slf4j
@Service
@AllArgsConstructor
public class UpdateUserCommandHandler implements UpdateUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(UpdateUserRequest request) {
        log.info("Executing UpdateUserCommand for userId: {}", request.userId());
        
        var userResult = queryRepository.findById(request.userId());

        if (userResult.isEmpty()) {
            log.warn("Failed to update user - user not found with id: {}", request.userId());
            throw new UserNotFoundException();
        }

        var user = userResult.get();
        var newUsername = Username.fromString(request.username());

        user.setUsername(newUsername);

        var updatedUser = commandRepository.update(user);
        log.info("Successfully updated user with id: {}", updatedUser.getId().getValue());
        return updatedUser.getId();
    }
}
