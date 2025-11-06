package tpa.network.backend.application.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.backend.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.backend.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.backend.domain.readmodel.BookingReadModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllBookingsQueryHandler implements GetAllBookingsQuery {
    private final BookingQueryRepositoryPort queryRepository;

    @Override
    public List<BookingReadModel> execute() {
        return queryRepository.findAll();
    }
}
