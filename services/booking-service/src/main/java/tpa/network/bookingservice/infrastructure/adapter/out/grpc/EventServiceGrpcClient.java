package tpa.network.bookingservice.infrastructure.adapter.out.grpc;

import io.grpc.StatusRuntimeException;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Component;
import tpa.network.bookingservice.domain.port.out.grpc.EventServicePort;
import tpa.network.eventservice.EventQueryServiceGrpc;
import tpa.network.eventservice.GetEventByIdRequest;

@Component
public class EventServiceGrpcClient implements EventServicePort {
    
    @GrpcClient("event-service")
    private EventQueryServiceGrpc.EventQueryServiceBlockingStub eventQueryStub;

    @Override
    public boolean existsById(String eventId) {
        try {
            GetEventByIdRequest request = GetEventByIdRequest.newBuilder()
                    .setId(eventId)
                    .build();

            var response = eventQueryStub.getEventById(request);
            return response.hasEvent();
        } catch (StatusRuntimeException e) {
            throw new RuntimeException("Event not found: " + e.getMessage(), e);
        }
    }
}
