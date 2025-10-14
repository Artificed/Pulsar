package tpa.network.eventservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class EventServiceApplication {

    @RequestMapping("/")
    public String index() {
        return "Test";
    }

    public static void main(String[] args) {
        SpringApplication.run(EventServiceApplication.class, args);
    }

}
