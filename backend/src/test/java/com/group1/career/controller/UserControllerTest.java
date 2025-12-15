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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class) // 仅加载 Web 层，不启动完整 Context，速度快
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService; // Mock 掉 Service，只测接口层

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("API Test: Login Success")
    public void testLogin_Success() throws Exception {
        // 1. 准备请求数据
        UserController.LoginRequest loginRequest = new UserController.LoginRequest();
        loginRequest.setIdentityType("MOBILE");
        loginRequest.setIdentifier("13800138000");
        loginRequest.setCredential("password123");

        // 2. Mock Service 返回
        User mockUser = new User();
        mockUser.setUserId(1L);
        mockUser.setNickname("TestUser");
        when(userService.login(anyString(), anyString(), anyString())).thenReturn(mockUser);

        // 3. 发起 HTTP 请求并验证
        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk()) // 验证 HTTP 200
                .andExpect(jsonPath("$.code").value(200)) // 验证业务码
                .andExpect(jsonPath("$.data.userId").value(1)) // 验证返回数据
                .andExpect(jsonPath("$.data.nickname").value("TestUser"));
    }
}
