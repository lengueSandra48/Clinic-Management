package com.team48.clinic_management_backend.services;

import com.team48.clinic_management_backend.dtos.LoginUserDto;
import com.team48.clinic_management_backend.dtos.RegisterUserDto;
import com.team48.clinic_management_backend.entities.Role;
import com.team48.clinic_management_backend.entities.User;
import com.team48.clinic_management_backend.repositories.RoleRepository;
import com.team48.clinic_management_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public User signup(RegisterUserDto input){

        //try to get the user role
        var userRole = roleRepository.findByRoleName("ADMIN")
                .orElseThrow(() -> new IllegalStateException("ROLE ADMIN was not initialized"));

        //Create user object and persists in database
        User user = User.builder()
                .fullName(input.getFullName())
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword())) //encode the user password
                .isActive(false) //by default the account is not active
                .roles(List.of(userRole))
                .build();
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
       return userRepository.findByEmail(input.getEmail()).orElseThrow();


    }
}
