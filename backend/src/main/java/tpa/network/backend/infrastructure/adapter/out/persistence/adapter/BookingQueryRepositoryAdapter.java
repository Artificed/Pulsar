package tpa.network.backend.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.backend.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.backend.domain.readmodel.BookingReadModel;
import tpa.network.backend.infrastructure.adapter.out.persistence.mapper.BookingPersistenceMapper;
import tpa.network.backend.infrastructure.adapter.out.persistence.mongodb.repository.BookingRepository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class BookingQueryRepositoryAdapter implements BookingQueryRepositoryPort {
    private final BookingRepository repository;
    private final BookingPersistenceMapper mapper;

    @Override
    public List<BookingReadModel> findAll() {
        return repository.findAll().stream()
                .map(mapper::toReadModel)
                .toList();
    }

    @Override
    public Optional<BookingReadModel> findById(String id) {
        return repository.findById(id)
                .map(mapper::toReadModel);
    }
}
