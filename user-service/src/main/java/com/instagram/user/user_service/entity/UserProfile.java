package com.instagram.user.user_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    private UUID id;  // SAME as auth-service userId (from X-User-Id header)

    @Column(unique = true, nullable = false)
    private String username;

    private String bio;

    private String profileImageUrl;
}
