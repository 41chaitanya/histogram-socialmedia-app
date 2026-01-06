package com.instagram.auth.auth_service.service;

import com.instagram.auth.auth_service.dto.request.RegisterRequest;
import com.instagram.auth.auth_service.dto.request.LoginRequest;
import com.instagram.auth.auth_service.dto.response.AuthResponse;
import com.instagram.auth.auth_service.entity.UserCredential;
import com.instagram.auth.auth_service.repository.UserCredentialRepository;
import com.instagram.auth.auth_service.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserCredentialRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public void registerUser(RegisterRequest request) {
        repository.findByUsername(request.getUsername())
                .ifPresent(user -> {
                    throw new RuntimeException("User already exists");
                });

        UserCredential user = UserCredential.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .build();

        repository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
       
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        
        UserCredential user = repository.findByUsername(
                request.getUsername()
        ).orElseThrow(() ->
                new RuntimeException("User not found")
        );

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return AuthResponse.builder()
                .statusCode(200)
                .username(user.getUsername())
                .role(user.getRole().name())
                .token(token)
                .build();
    }
}
