package tpa.network.userservice.infrastructure.adapter.in.grpc.interceptor;

import io.grpc.*;
import org.springframework.stereotype.Component;
import tpa.network.userservice.domain.exception.*;

@Component
public class GlobalExceptionInterceptor implements ServerInterceptor {

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> serverCall,
            Metadata headers,
            ServerCallHandler<ReqT, RespT> next
    ) {
        var listener = next.startCall(serverCall, headers);

        return new ForwardingServerCallListener.SimpleForwardingServerCallListener<>(listener) {
            @Override
            public void onHalfClose() {
                try {
                    super.onHalfClose();
                } catch (Exception e) {
                    handleException(e, serverCall);
                }
            }
        };
    }

    private <ReqT, RespT> void handleException(
            Exception e,
            ServerCall<ReqT, RespT> serverCall
    ) {
        var status = mapExceptionToStatus(e);
        serverCall.close(status, new Metadata());
    }

    private Status mapExceptionToStatus(Exception e) {
        return switch (e) {
            case UserNotFoundException ex ->
                    Status.NOT_FOUND.withDescription(ex.getMessage());

            case EmailTakenException ex ->
                    Status.ALREADY_EXISTS.withDescription(ex.getMessage());

            case InvalidUsernameFormatException ex ->
                    Status.INVALID_ARGUMENT.withDescription(ex.getMessage());

            case InvalidEmailFormatException ex ->
                    Status.INVALID_ARGUMENT.withDescription(ex.getMessage());

            case InvalidPasswordFormatException ex ->
                    Status.INVALID_ARGUMENT.withDescription(ex.getMessage());

            default ->
                    Status.INTERNAL.withDescription("Internal server error");
        };
    }
}