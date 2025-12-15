package com.group1.career.controller;

import com.group1.career.common.Result;
import com.group1.career.model.entity.User;
import com.group1.career.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
    public Result<User> register(@RequestParam String nickname,
                                 @RequestParam String identityType,
                                 @RequestParam String identifier,
                                 @RequestParam String credential) {
        return Result.success(userService.register(nickname, identityType, identifier, credential));
    }

    @Operation(summary = "Login")
    @PostMapping("/login")
    public Result<User> login(@RequestParam String identityType,
                              @RequestParam String identifier,
                              @RequestParam String credential) {
        return Result.success(userService.login(identityType, identifier, credential));
    }

    @Operation(summary = "Get User Info (Redis Cache)")
    @GetMapping("/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        return Result.success(userService.getUserById(id));
    }
}

