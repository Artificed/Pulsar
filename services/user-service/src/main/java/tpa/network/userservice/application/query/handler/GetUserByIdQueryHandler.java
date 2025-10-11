package tpa.network.userservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.userservice.application.mapper.UserMapper;
import tpa.network.userservice.domain.port.in.query.GetUserByIdQuery;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;
import tpa.network.userservice.domain.readmodel.UserReadModel;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetUserByIdQueryHandler implements GetUserByIdQuery {
    private final UserQueryRepositoryPort queryRepository;
    private final UserMapper mapper;

    @Override
    public Optional<UserReadModel> execute(String id) {
        return queryRepository.findById(id).map(mapper::toReadModel);
    }
}
