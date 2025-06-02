package com.team48.clinic_management_backend.config;

import com.team48.clinic_management_backend.config.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final JwtFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers(
                                "/api-clinic/auth/**",
                                "/api-clinic/v2/api-docs",
                                "/api-clinic/v3/api-docs/**",
                                "/api-clinic/swagger-resources",
                                "/api-clinic/swagger-resources/**",
                                "/api-clinic/configuration/ui",
                                "/api-clinic/configuration/security",
                                "/api-clinic/swagger-ui/**",
                                "/api-clinic/webjars/**",
                                "/api-clinic/swagger-ui.html"
                        ).permitAll()

                        // Role-based endpoints
                        .requestMatchers("/api-clinic/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api-clinic/doctor/**").hasRole("DOCTOR")
                        .requestMatchers("/api-clinic/secretary/**").hasRole("SECRETARY")

                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}