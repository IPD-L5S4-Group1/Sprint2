package com.group1.career.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.career.model.document.ResumeDocument;
import com.group1.career.model.entity.Resume;
import com.group1.career.service.ResumeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ResumeController.class)
public class ResumeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ResumeService resumeService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("API Test: Create Resume")
    public void testCreateResume_Success() throws Exception {
        // 1. 准备请求
        ResumeDocument detail = new ResumeDocument();
        // 设置一些 detail 属性...

        ResumeController.CreateResumeRequest request = new ResumeController.CreateResumeRequest();
        request.setUserId(1L);
        request.setTitle("My Resume");
        request.setDetail(detail);

        // 2. Mock Service
        Resume mockResume = new Resume();
        mockResume.setResumeId(100L);
        mockResume.setMongoDocId("mongo_abc");

        when(resumeService.createResume(anyLong(), anyString(), any(), any(), any()))
                .thenReturn(mockResume);

        // 3. 执行请求
        mockMvc.perform(post("/api/resumes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.resumeId").value(100))
                .andExpect(jsonPath("$.data.mongoDocId").value("mongo_abc"));
    }
}