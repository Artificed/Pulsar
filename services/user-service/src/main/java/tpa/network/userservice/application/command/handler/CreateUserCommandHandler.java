package tpa.network.userservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.userservice.domain.exception.EmailTakenException;
import tpa.network.userservice.domain.exception.UserNotFoundException;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;
import tpa.network.userservice.domain.port.in.command.CreateUserCommand;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;

@Service
@RequiredArgsConstructor
public class CreateUserCommandHandler implements CreateUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(CreateUserRequest request) {
        if (queryRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailTakenException("Email is already taken");
        }

        User user = User.create(
                request.username(),
                request.email(),
                request.password()
        );

        User savedUser = commandRepository.save(user);
        return savedUser.getId();
    }
}
