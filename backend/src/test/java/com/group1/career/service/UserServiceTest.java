package com.group1.career.service;

import com.group1.career.model.entity.User;
import com.group1.career.model.entity.UserAuth;
import com.group1.career.repository.UserAuthRepository;
import com.group1.career.repository.UserRepository;
import com.group1.career.service.impl.UserServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserAuthRepository userAuthRepository;

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @Mock
    private ValueOperations<String, Object> valueOperations;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    @DisplayName("Test User Registration - Successfully insert data")
    public void testRegister_Success() {
        // 1. Prepare test data
        String nickname = "TestUser";
        String identityType = "MOBILE";
        String identifier = "13800138000";
        String credential = "password123";

        User mockUser = User.builder().userId(1L).nickname(nickname).build();

        // 2. Mock dependency behavior
        // Mock identifier does not exist (User not registered yet)
        when(userAuthRepository.findByIdentifierAndIdentityType(identifier, identityType))
                .thenReturn(Optional.empty());

        // Mock saving User entity
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        // Mock saving UserAuth entity (return value doesn't impact logic here)
        when(userAuthRepository.save(any(UserAuth.class))).thenReturn(new UserAuth());

        // 3. Execute the service method
        User result = userService.register(nickname, identityType, identifier, credential);

        // 4. Verify results
        assertNotNull(result);
        assertEquals(1L, result.getUserId());
        assertEquals(nickname, result.getNickname());

        // 5. Verify interactions: Ensure repositories were called correctly
        verify(userRepository, times(1)).save(any(User.class));
        verify(userAuthRepository, times(1)).save(any(UserAuth.class));
    }

    @Test
    @DisplayName("Test Get User By ID - Fetch from DB when Cache Miss")
    public void testGetUserById_FromDb() {
        // 1. Prepare data
        Long userId = 1L;
        String cacheKey = "user:info:" + userId;
        User mockUser = User.builder().userId(userId).nickname("TestUser").build();

        // 2. Mock Redis operations
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        // Simulate cache miss (return null)
        when(valueOperations.get(cacheKey)).thenReturn(null);

        // 3. Mock Database operations
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        // 4. Execute test
        User result = userService.getUserById(userId);

        // 5. Verify results
        assertNotNull(result);
        assertEquals(userId, result.getUserId());

        // 6. Verify flow: Check Redis -> Check DB -> Write back to Redis
        verify(valueOperations, times(1)).get(cacheKey);
        verify(userRepository, times(1)).findById(userId);
        verify(valueOperations, times(1)).set(eq(cacheKey), any(User.class), anyLong(), any());
    }
}