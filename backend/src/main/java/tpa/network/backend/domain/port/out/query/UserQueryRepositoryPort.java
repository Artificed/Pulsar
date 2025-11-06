package tpa.network.backend.domain.port.out.query;

import org.springframework.stereotype.Repository;
import tpa.network.backend.domain.model.user.User;

import java.util.List;
import java.util.Optional;

public interface UserQueryRepositoryPort {
    List<User> findAll();
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
}