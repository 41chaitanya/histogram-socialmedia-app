package com.instagram.user.user_service.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String bio;
    private String profileImageUrl;
}
