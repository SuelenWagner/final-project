package com.api.finalprojectbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class FinalProjectBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalProjectBackendApplication.class, args);
		System.out.println(new BCryptPasswordEncoder().encode("senha123"));

	}

}
