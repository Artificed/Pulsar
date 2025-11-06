package tpa.network.backend.application.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.application.mapper.UserMapper;
import tpa.network.backend.domain.port.in.query.GetAllUsersQuery;
import tpa.network.backend.domain.port.out.query.UserQueryRepositoryPort;
import tpa.network.backend.domain.readmodel.UserReadModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetAllUsersQueryHandler implements GetAllUsersQuery {
    private final UserQueryRepositoryPort queryRepository;
    private final UserMapper mapper;

    @Override
    public List<UserReadModel> execute() {
        return queryRepository.findAll()
                .stream()
                .map(mapper::toReadModel)
                .collect(Collectors.toList());
    }
}