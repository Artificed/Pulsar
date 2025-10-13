package tpa.network.userservice.infrastructure.adapter.in.rest.command;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.userservice.domain.port.in.command.CreateUserCommand;
import tpa.network.userservice.domain.port.in.command.DeleteUserCommand;
import tpa.network.userservice.domain.port.in.command.UpdateUserCommand;
import tpa.network.userservice.infrastructure.adapter.in.rest.command.dto.*;

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
        var id = createUserCommand.execute(
                new CreateUserCommand.CreateUserRequest(
                        createUserRequest.username(),
                        createUserRequest.email(),
                        createUserRequest.password()
                )
        );

        var response = new CreateUserResponse(id.getValue());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<UpdateUserResponse> updateUser(
            @RequestBody @Valid UpdateUserRequest updateUserRequest
    ) {
        var id = updateUserCommand.execute(
                new UpdateUserCommand.UpdateUserRequest(
                        updateUserRequest.id(),
                        updateUserRequest.username()
                )
        );

        var response = new UpdateUserResponse(id.getValue());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<DeleteUserResponse> deleteUser(
            @RequestBody @Valid DeleteUserRequest deleteUserRequest
    ) {
        var id = deleteUserCommand.execute(
                new DeleteUserCommand.DeleteUserRequest(
                        deleteUserRequest.id()
                )
        );

        var response = new DeleteUserResponse(id.getValue());
        return ResponseEntity.ok(response);
    }
}
