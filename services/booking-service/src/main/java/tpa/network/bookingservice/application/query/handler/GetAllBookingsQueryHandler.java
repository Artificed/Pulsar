package tpa.network.bookingservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

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
