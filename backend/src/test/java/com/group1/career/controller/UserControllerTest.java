package com.group1.career.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.career.model.entity.User;
import com.group1.career.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("API Test: Register Success") // [新增]
    public void testRegister_Success() throws Exception {
        UserController.RegisterRequest request = new UserController.RegisterRequest();
        request.setNickname("NewUser");
        request.setIdentityType("EMAIL");
        request.setIdentifier("test@example.com");
        request.setCredential("pass123");

        User mockUser = new User();
        mockUser.setUserId(2L);
        mockUser.setNickname("NewUser");

        when(userService.register(anyString(), anyString(), anyString(), anyString()))
                .thenReturn(mockUser);

        mockMvc.perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.userId").value(2));
    }

    @Test
    @DisplayName("API Test: Login Success")
    public void testLogin_Success() throws Exception {
        UserController.LoginRequest loginRequest = new UserController.LoginRequest();
        loginRequest.setIdentityType("MOBILE");
        loginRequest.setIdentifier("13800138000");
        loginRequest.setCredential("password123");

        User mockUser = new User();
        mockUser.setUserId(1L);
        mockUser.setNickname("TestUser");
        when(userService.login(anyString(), anyString(), anyString())).thenReturn(mockUser);

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.userId").value(1));
    }

    @Test
    @DisplayName("API Test: Get User Info") // [新增]
    public void testGetUser_Success() throws Exception {
        Long userId = 1L;
        User mockUser = new User();
        mockUser.setUserId(userId);
        mockUser.setNickname("ExistingUser");

        when(userService.getUserById(userId)).thenReturn(mockUser);

        mockMvc.perform(get("/users/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.userId").value(userId))
                .andExpect(jsonPath("$.data.nickname").value("ExistingUser"));
    }
}