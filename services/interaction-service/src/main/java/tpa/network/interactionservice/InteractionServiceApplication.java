package tpa.network.interactionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class InteractionServiceApplication {

    @GetMapping
    public String index() {
        return "Hello World";
    }

    public static void main(String[] args) {
        SpringApplication.run(InteractionServiceApplication.class, args);
    }

}
