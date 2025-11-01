package tpa.network.bookingservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

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
