package tpa.network.userservice.application.command.handler;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.userservice.domain.exception.UserNotFoundException;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.port.in.command.DeleteUserCommand;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;

@Slf4j
@Service
@AllArgsConstructor
public class DeleteUserCommandHandler implements DeleteUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteUserRequest request) {
        log.info("Executing DeleteUserCommand for userId: {}", request.userId());
        
        if (queryRepository.findById(request.userId()).isEmpty()) {
            log.warn("Failed to delete user - user not found with id: {}", request.userId());
            throw new UserNotFoundException();
        }

        var deletedId = commandRepository.deleteById(request.userId());
        log.info("Successfully deleted user with id: {}", deletedId.getValue());
        return deletedId;
    }
}
