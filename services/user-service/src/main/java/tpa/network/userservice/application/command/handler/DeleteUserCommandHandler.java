package tpa.network.userservice.application.command.handler;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.userservice.domain.exception.UserNotFoundException;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.port.in.command.DeleteUserCommand;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;

@Service
@AllArgsConstructor
public class DeleteUserCommandHandler implements DeleteUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteUserRequest request) {
        if (queryRepository.findById(request.userId()).isEmpty()) {
            throw new UserNotFoundException("User Not Found");
        }

        return commandRepository.deleteById(request.userId());
    }
}
