package com.instagram.user.user_service.service;

import com.instagram.user.user_service.dto.request.UpdateProfileRequest;
import com.instagram.user.user_service.dto.response.UserProfileResponse;
import com.instagram.user.user_service.entity.UserProfile;
import com.instagram.user.user_service.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserProfileRepository repository;

    /**
     * GET /users/me
     * Returns user profile, creates one if first time
     */
    public UserProfileResponse getMyProfile(UUID userId, String username) {
        UserProfile profile = repository.findById(userId)
                .orElseGet(() -> {
                    // First time user → create profile
                    UserProfile newProfile = UserProfile.builder()
                            .id(userId)
                            .username(username)
                            .build();
                    return repository.save(newProfile);
                });

        return mapToResponse(profile);
    }

    /**
     * PUT /users/me
     * Updates user profile (bio, profileImageUrl)
     */
    public UserProfileResponse updateProfile(UUID userId, UpdateProfileRequest request) {
        UserProfile profile = repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        profile.setBio(request.getBio());
        profile.setProfileImageUrl(request.getProfileImageUrl());
        repository.save(profile);

        return mapToResponse(profile);
    }

    private UserProfileResponse mapToResponse(UserProfile profile) {
        return UserProfileResponse.builder()
                .id(profile.getId())
                .username(profile.getUsername())
                .bio(profile.getBio())
                .profileImageUrl(profile.getProfileImageUrl())
                .build();
    }
}
