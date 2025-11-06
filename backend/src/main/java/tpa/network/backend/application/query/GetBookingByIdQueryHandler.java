package tpa.network.backend.application.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.backend.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.backend.domain.readmodel.BookingReadModel;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetBookingByIdQueryHandler implements GetBookingByIdQuery {
    private final BookingQueryRepositoryPort queryRepository;

    @Override
    public Optional<BookingReadModel> execute(String id) {
        return queryRepository.findById(id);
    }
}
