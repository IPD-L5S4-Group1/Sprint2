package com.group1.career.controller;

import com.group1.career.common.Result;
import com.group1.career.model.entity.User;
import com.group1.career.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User API")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "Register User")
    @PostMapping("/register")
    public Result<User> register(@RequestBody RegisterRequest request) {
        return Result.success(userService.register(
                request.getNickname(),
                request.getIdentityType(),
                request.getIdentifier(),
                request.getCredential()
        ));
    }

    @Operation(summary = "Login")
    @PostMapping("/login")
    public Result<User> login(@RequestBody LoginRequest request) {
        return Result.success(userService.login(
                request.getIdentityType(),
                request.getIdentifier(),
                request.getCredential()
        ));
    }

    @Operation(summary = "Get User Info (Redis Cache)")
    @GetMapping("/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        return Result.success(userService.getUserById(id));
    }

    // ================= DTO Classes =================

    @Data
    public static class RegisterRequest {
        private String nickname;
        private String identityType; // e.g., "MOBILE", "EMAIL"
        private String identifier;   // e.g., "13800138000"
        private String credential;   // Password
    }

    @Data
    public static class LoginRequest {
        private String identityType;
        private String identifier;
        private String credential;
    }
}