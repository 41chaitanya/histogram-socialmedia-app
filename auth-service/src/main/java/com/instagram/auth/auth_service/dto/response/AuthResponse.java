package com.instagram.auth.auth_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AuthResponse {
    private int statusCode;
    private String username;
    private String role;
    private String token;
}
