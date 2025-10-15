package tpa.network.interactionservice.infrastructure.adapter.out.persistence.mongodb.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "interactions")
public class InteractionDocument implements Persistable<String> {

    @Id
    private String id;

    private String userId;
    private String eventId;
    private boolean viewed;
    private boolean booked;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public InteractionDocument(String id, String userId, String eventId, boolean viewed, boolean booked) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.viewed = viewed;
        this.booked = booked;
    }

    @Override
    public boolean isNew() {
        return createdAt == null;
    }
}
