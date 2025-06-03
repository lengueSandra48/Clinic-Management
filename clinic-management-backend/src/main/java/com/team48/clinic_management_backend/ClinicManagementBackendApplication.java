package com.team48.clinic_management_backend;

import com.team48.clinic_management_backend.entities.Role;
import com.team48.clinic_management_backend.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClinicManagementBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicManagementBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository){

		return args -> {
			if (roleRepository.findByRoleName("ADMIN").isEmpty()){

				roleRepository.save(
						Role.builder().roleName("ADMIN").build()
				);

			}
			if (roleRepository.findByRoleName("SECRETARY").isEmpty()){

				roleRepository.save(
						Role.builder().roleName("SECRETARY").build()
				);

			}

			if (roleRepository.findByRoleName("DOCTOR").isEmpty()){

				roleRepository.save(
						Role.builder().roleName("DOCTOR").build()
				);

			}
		};
	}
}
