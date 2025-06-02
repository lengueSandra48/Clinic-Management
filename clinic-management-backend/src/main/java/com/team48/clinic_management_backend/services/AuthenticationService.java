package com.team48.clinic_management_backend.services;

import com.team48.clinic_management_backend.dtos.LoginUserDto;
import com.team48.clinic_management_backend.dtos.RegisterUserDto;
import com.team48.clinic_management_backend.entities.User;
import com.team48.clinic_management_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public User signup(RegisterUserDto input){
        User user = User.builder()
                .fullName(input.getFullName())
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword()))
                .isActive(false)
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
