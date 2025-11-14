package tpa.network.authservice.domain.port.out;

public interface PasswordEncoderPort {
    boolean matches(String rawPassword, String encodedPassword);
}
