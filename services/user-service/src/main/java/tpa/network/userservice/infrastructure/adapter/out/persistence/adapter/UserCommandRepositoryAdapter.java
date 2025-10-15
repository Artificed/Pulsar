package tpa.network.userservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mapper.UserPersistenceMapper;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mongodb.repository.UserRepository;

@Repository
@RequiredArgsConstructor
public class UserCommandRepositoryAdapter implements UserCommandRepositoryPort {
    private final UserRepository repository;
    private final UserPersistenceMapper mapper;

    @Override
    public User insert(User user) {
        var userDocument = mapper.toDocument(user);
        var insertedUser = repository.save(userDocument);
        return mapper.toUser(insertedUser);
    }

    @Override
    public User update(User user) {
        var userDocument = mapper.toDocument(user);
        var updatedUser = repository.updateUser(userDocument);
        return mapper.toUser(updatedUser);
    }

    @Override
    public Id deleteById(String id) {
        repository.deleteById(id);
        return Id.fromString(id);
    }
}
