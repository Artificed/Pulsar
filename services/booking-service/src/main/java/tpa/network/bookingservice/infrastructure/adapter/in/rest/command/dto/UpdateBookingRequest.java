package tpa.network.bookingservice.infrastructure.adapter.in.rest.command.dto;

public record UpdateBookingRequest(
        String eventId,
        int quantity
) { }
