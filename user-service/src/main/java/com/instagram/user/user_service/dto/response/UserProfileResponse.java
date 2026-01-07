package com.instagram.user.user_service.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class UserProfileResponse {
    private UUID id;
    private String username;
    private String bio;
    private String profileImageUrl;
}
