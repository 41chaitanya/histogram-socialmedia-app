package com.instagram.user.user_service.controller;

import com.instagram.user.user_service.dto.request.UpdateProfileRequest;
import com.instagram.user.user_service.dto.response.UserProfileResponse;
import com.instagram.user.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * User Controller
 * 
 * NO SecurityConfig needed - Gateway handles JWT validation
 * Uses X-User-Id and X-Username headers injected by Gateway
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * GET /users/me
     * Get current user's profile
     */
    @GetMapping("/me")
    public UserProfileResponse me(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestHeader("X-Username") String username) {
        return userService.getMyProfile(userId, username);
    }

    /**
     * PUT /users/me
     * Update current user's profile
     */
    @PutMapping("/me")
    public UserProfileResponse update(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody UpdateProfileRequest request) {
        return userService.updateProfile(userId, request);
    }
}
