package tpa.network.userservice.infrastructure.adapter.in.rest.command;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.userservice.domain.port.in.command.CreateUserCommand;
import tpa.network.userservice.domain.port.in.command.DeleteUserCommand;
import tpa.network.userservice.domain.port.in.command.UpdateUserCommand;
import tpa.network.userservice.infrastructure.adapter.in.rest.command.dto.*;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserCommandController {
    private final CreateUserCommand createUserCommand;
    private final UpdateUserCommand updateUserCommand;
    private final DeleteUserCommand deleteUserCommand;

    @PostMapping
    public ResponseEntity<CreateUserResponse> createUser(
            @RequestBody @Valid CreateUserRequest createUserRequest
    ) {
        log.info("REST API - Received request to create user with username: {}, email: {}", 
                createUserRequest.username(), createUserRequest.email());
        
        var id = createUserCommand.execute(
                new CreateUserCommand.CreateUserRequest(
                        createUserRequest.username(),
                        createUserRequest.email(),
                        createUserRequest.password()
                )
        );

        log.info("REST API - Successfully created user with id: {}", id.getValue());
        var response = new CreateUserResponse(id.getValue());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<UpdateUserResponse> updateUser(
            @RequestBody @Valid UpdateUserRequest updateUserRequest
    ) {
        log.info("REST API - Received request to update user with id: {}, new username: {}", 
                updateUserRequest.id(), updateUserRequest.username());
        
        var id = updateUserCommand.execute(
                new UpdateUserCommand.UpdateUserRequest(
                        updateUserRequest.id(),
                        updateUserRequest.username()
                )
        );

        log.info("REST API - Successfully updated user with id: {}", id.getValue());
        var response = new UpdateUserResponse(id.getValue());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteUserResponse> deleteUser(
            @PathVariable String id
    ) {
        log.info("REST API - Received request to delete user with id: {}", id);
        
        var deletedId = deleteUserCommand.execute(
                new DeleteUserCommand.DeleteUserRequest(id)
        );

        log.info("REST API - Successfully deleted user with id: {}", deletedId.getValue());
        var response = new DeleteUserResponse(deletedId.getValue());
        return ResponseEntity.ok(response);
    }
}
