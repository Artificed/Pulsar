package tpa.network.userservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tpa.network.userservice.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
