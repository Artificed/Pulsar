package tpa.network.userservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mapper.UserPersistenceMapper;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mongodb.repository.UserRepository;

@RequiredArgsConstructor
public class UserCommandRepositoryAdapter implements UserCommandRepositoryPort {
    private UserRepository repository;
    private UserPersistenceMapper mapper;

    @Override
    public User save(User user) {
        var userDocument = mapper.toDocument(user);
        var savedDocument = repository.save(userDocument);
        return mapper.toUser(savedDocument);
    }

    @Override
    public Id deleteById(String id) {
        repository.deleteById(id);
        return Id.fromString(id);
    }
}
