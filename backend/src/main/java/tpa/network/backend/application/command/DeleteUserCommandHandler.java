package tpa.network.backend.application.command;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.exception.UserNotFoundException;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.port.in.command.DeleteUserCommand;
import tpa.network.backend.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.backend.domain.port.out.query.UserQueryRepositoryPort;

@Service
@AllArgsConstructor
public class DeleteUserCommandHandler implements DeleteUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteUserRequest request) {
        if (queryRepository.findById(request.userId()).isEmpty()) {
            throw new UserNotFoundException();
        }

        return commandRepository.deleteById(request.userId());
    }
}
