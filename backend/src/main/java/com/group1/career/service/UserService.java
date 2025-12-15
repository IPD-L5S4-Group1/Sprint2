package com.group1.career.service;

import com.group1.career.model.entity.User;

public interface UserService {
    User register(String nickname, String identityType, String identifier, String credential);
    User login(String identityType, String identifier, String credential);
    User getUserById(Long userId);
}

