package com.group1.career.service.impl;

import com.group1.career.common.ErrorCode;
import com.group1.career.common.Result;
import com.group1.career.model.entity.User;
import com.group1.career.model.entity.UserAuth;
import com.group1.career.repository.UserAuthRepository;
import com.group1.career.repository.UserRepository;
import com.group1.career.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String USER_CACHE_PREFIX = "user:info:";

    @Override
    @Transactional
    public User register(String nickname, String identityType, String identifier, String credential) {
        // 1. Check if identifier exists
        Optional<UserAuth> existingAuth = userAuthRepository.findByIdentifierAndIdentityType(identifier, identityType);
        if (existingAuth.isPresent()) {
            throw new RuntimeException("User already exists"); // Should use custom exception in real project
        }

        // 2. Create User
        User user = User.builder()
                .nickname(nickname)
                .build();
        user = userRepository.save(user);

        // 3. Create UserAuth
        UserAuth userAuth = UserAuth.builder()
                .userId(user.getUserId())
                .identityType(identityType)
                .identifier(identifier)
                .credential(credential) // In real world, encrypt this!
                .build();
        userAuthRepository.save(userAuth);

        return user;
    }

    @Override
    public User login(String identityType, String identifier, String credential) {
        UserAuth userAuth = userAuthRepository.findByIdentifierAndIdentityType(identifier, identityType)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!userAuth.getCredential().equals(credential)) { // In real world, check hash
             throw new RuntimeException("Invalid credential");
        }

        return getUserById(userAuth.getUserId());
    }

    @Override
    public User getUserById(Long userId) {
        String cacheKey = USER_CACHE_PREFIX + userId;
        
        // 1. Check Cache
        Object cachedUser = redisTemplate.opsForValue().get(cacheKey);
        if (cachedUser instanceof User) {
            return (User) cachedUser;
        }

        // 2. Check DB
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Write Cache
        redisTemplate.opsForValue().set(cacheKey, user, 1, TimeUnit.HOURS);
        
        return user;
    }
}

