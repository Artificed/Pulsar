package tpa.network.backend.application.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.exception.EmailTakenException;
import tpa.network.backend.domain.exception.UserNotFoundException;
import tpa.network.backend.domain.model.shared.Id;
import tpa.network.backend.domain.model.user.User;
import tpa.network.backend.domain.port.in.command.CreateUserCommand;
import tpa.network.backend.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.backend.domain.port.out.query.UserQueryRepositoryPort;

@Service
@RequiredArgsConstructor
public class CreateUserCommandHandler implements CreateUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(CreateUserRequest request) {
        if (queryRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailTakenException();
        }

        User user = User.create(
                request.username(),
                request.email(),
                request.password()
        );

        User savedUser = commandRepository.insert(user);
        return savedUser.getId();
    }
}
