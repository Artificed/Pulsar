package tpa.network.backend.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.backend.domain.model.user.User;
import tpa.network.backend.domain.port.out.query.UserQueryRepositoryPort;
import tpa.network.backend.infrastructure.adapter.out.persistence.mapper.UserPersistenceMapper;
import tpa.network.backend.infrastructure.adapter.out.persistence.mongodb.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class UserQueryRepositoryAdapter implements UserQueryRepositoryPort {
    private final UserRepository repository;
    private final UserPersistenceMapper mapper;

    @Override
    public List<User> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toUser)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<User> findById(String id) {
        return repository.findById(id).map(mapper::toUser);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email).map(mapper::toUser);
    }
}
