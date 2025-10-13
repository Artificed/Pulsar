package tpa.network.userservice.infrastructure.adapter.in.rest.query;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.userservice.domain.port.in.query.GetAllUsersQuery;
import tpa.network.userservice.domain.port.in.query.GetUserByIdQuery;
import tpa.network.userservice.domain.readmodel.UserReadModel;
import tpa.network.userservice.infrastructure.adapter.in.rest.query.dto.UserResponse;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserQueryController {
    private final GetAllUsersQuery getAllUsersQuery;
    private final GetUserByIdQuery getUserByIdQuery;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        var users = getAllUsersQuery.execute();
        return ResponseEntity.ok(
                users.stream()
                        .map(this::toResponse)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable String id
    ) {
        return getUserByIdQuery.execute(id)
                .map(u -> ResponseEntity.ok(toResponse(u)))
                .orElse(ResponseEntity.notFound().build());
    }

    private UserResponse toResponse(UserReadModel user) {
        return new UserResponse(
                user.id(),
                user.username(),
                user.email(),
                user.password()
        );
    }
}
