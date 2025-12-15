package com.group1.career.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_auths")
public class UserAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_id")
    private Long authId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "identity_type", length = 20, nullable = false)
    private String identityType; // PASSWORD, WECHAT, MOBILE

    @Column(name = "identifier", length = 100, nullable = false)
    private String identifier;

    @Column(name = "credential")
    private String credential;

    @Column(name = "last_login_time")
    private LocalDateTime lastLoginTime;
}

