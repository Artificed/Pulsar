package tpa.network.backend.application.mapper;

import org.springframework.stereotype.Component;
import tpa.network.backend.domain.model.booking.Booking;
import tpa.network.backend.domain.readmodel.BookingReadModel;

@Component
public class BookingMapper {

    public BookingReadModel toReadModel(Booking booking) {
        return new BookingReadModel(
                booking.getId().getValue(),
                booking.getUserId().getValue(),
                booking.getEventId().getValue(),
                booking.getQuantity().getValue()
        );
    }
}
