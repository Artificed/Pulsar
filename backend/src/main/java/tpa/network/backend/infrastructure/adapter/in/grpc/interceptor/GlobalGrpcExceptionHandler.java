package tpa.network.backend.infrastructure.adapter.in.grpc.interceptor;

import io.grpc.Status;
import net.devh.boot.grpc.server.advice.GrpcAdvice;
import net.devh.boot.grpc.server.advice.GrpcExceptionHandler;
import tpa.network.backend.domain.exception.*;
import tpa.network.backend.domain.exception.BookingNotFoundException;
import tpa.network.backend.domain.exception.InvalidIdFormatException;
import tpa.network.backend.domain.exception.InvalidQuantityException;

@GrpcAdvice
public class GlobalGrpcExceptionHandler {

    @GrpcExceptionHandler(BookingNotFoundException.class)
    public Status handleBookingNotFoundException(BookingNotFoundException e) {
        return Status.NOT_FOUND.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler(UserNotFoundException.class)
    public Status handleUserNotFoundException(UserNotFoundException e) {
        return Status.NOT_FOUND.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler(EventNotFoundException.class)
    public Status handleEventNotFoundException(EventNotFoundException e) {
        return Status.NOT_FOUND.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler(EmailTakenException.class)
    public Status handleEmailTakenException(EmailTakenException e) {
        return Status.ALREADY_EXISTS.withDescription("Email is already taken").withCause(e);
    }

    @GrpcExceptionHandler({
            InvalidIdFormatException.class,
            InvalidQuantityException.class,
            InvalidPasswordFormatException.class,
            InvalidEmailFormatException.class,
            InvalidUsernameFormatException.class,
            InvalidCapacityException.class,
            InvalidPriceException.class,
            InvalidTitleException.class,
            InvalidDateTimeException.class
    })
    public Status handleValidationExceptions(RuntimeException e) {
        return Status.INVALID_ARGUMENT.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler(Exception.class)
    public Status handleGenericException(Exception e) {
        return Status.INTERNAL.withDescription("An internal error occurred").withCause(e);
    }
}
