package tpa.network.bookingservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mapper.BookingPersistenceMapper;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mongodb.repository.BookingRepository;

@Repository
@RequiredArgsConstructor
public class BookingCommandRepositoryAdapter implements BookingCommandRepositoryPort {
    private final BookingRepository repository;
    private final BookingPersistenceMapper mapper;

    @Override
    public Booking insert(Booking booking) {
        var bookingDocument = mapper.toDocument(booking);
        var insertedBooking = repository.save(bookingDocument);
        return mapper.toBooking(insertedBooking);
    }

    @Override
    public Id deleteById(String id) {
        repository.deleteById(id);
        return Id.fromString(id);
    }
}
