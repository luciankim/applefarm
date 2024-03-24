package kr.or.iei;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ApplefarmBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApplefarmBackApplication.class, args);
	}

}
