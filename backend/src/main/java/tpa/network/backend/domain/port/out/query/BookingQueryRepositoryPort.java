package tpa.network.backend.domain.port.out.query;

import tpa.network.backend.domain.readmodel.BookingReadModel;

import java.util.List;
import java.util.Optional;

public interface BookingQueryRepositoryPort {
    List<BookingReadModel> findAll();
    Optional<BookingReadModel> findById(String id);
}
