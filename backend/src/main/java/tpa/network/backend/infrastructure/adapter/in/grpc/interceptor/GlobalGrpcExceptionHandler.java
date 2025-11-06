package tpa.network.backend.infrastructure.adapter.in.grpc.interceptor;

import io.grpc.Status;
import net.devh.boot.grpc.server.advice.GrpcAdvice;
import net.devh.boot.grpc.server.advice.GrpcExceptionHandler;
import tpa.network.backend.domain.exception.BookingNotFoundException;
import tpa.network.backend.domain.exception.InvalidIdFormatException;
import tpa.network.backend.domain.exception.InvalidQuantityException;

@GrpcAdvice
public class GlobalGrpcExceptionHandler {

    @GrpcExceptionHandler(BookingNotFoundException.class)
    public Status handleBookingNotFoundException(BookingNotFoundException e) {
        return Status.NOT_FOUND.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler({
            InvalidIdFormatException.class,
            InvalidIdFormatException.class,
            InvalidQuantityException.class
    })
    public Status handleValidationExceptions(RuntimeException e) {
        return Status.INVALID_ARGUMENT.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler(Exception.class)
    public Status handleGenericException(Exception e) {
        return Status.INTERNAL.withDescription("An internal error occurred").withCause(e);
    }
}
