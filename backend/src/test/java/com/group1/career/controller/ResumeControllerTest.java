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

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
        ResumeDocument detail = new ResumeDocument();
        ResumeController.CreateResumeRequest request = new ResumeController.CreateResumeRequest();
        request.setUserId(1L);
        request.setTitle("My Resume");
        request.setDetail(detail);

        Resume mockResume = new Resume();
        mockResume.setResumeId(100L);
        mockResume.setMongoDocId("mongo_abc");

        when(resumeService.createResume(anyLong(), anyString(), any(), any(), any()))
                .thenReturn(mockResume);

        mockMvc.perform(post("/api/resumes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.resumeId").value(100));
    }

    @Test
    @DisplayName("API Test: Get Resume Detail") // [新增]
    public void testGetResume_Success() throws Exception {
        Long resumeId = 100L;
        String mongoId = "mongo_abc";

        // 1. Mock MySQL return
        Resume mockResume = new Resume();
        mockResume.setResumeId(resumeId);
        mockResume.setMongoDocId(mongoId);
        mockResume.setTitle("Detailed Resume");
        when(resumeService.getResumeWithDetailCheck(resumeId)).thenReturn(mockResume);

        // 2. Mock MongoDB return
        ResumeDocument mockDoc = new ResumeDocument();
        mockDoc.setId(mongoId);
        when(resumeService.getResumeDetail(mongoId)).thenReturn(mockDoc);

        // 3. Perform Request
        mockMvc.perform(get("/api/resumes/{id}", resumeId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("Detailed Resume"))
                .andExpect(jsonPath("$.data.detail.id").value(mongoId));
    }

    @Test
    @DisplayName("API Test: Get User Resumes List") // [新增]
    public void testGetUserResumes_Success() throws Exception {
        Long userId = 1L;
        Resume resume1 = new Resume();
        resume1.setResumeId(101L);
        resume1.setTitle("Resume 1");

        when(resumeService.getUserResumes(userId)).thenReturn(List.of(resume1));

        mockMvc.perform(get("/api/resumes/user/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].resumeId").value(101))
                .andExpect(jsonPath("$.data[0].title").value("Resume 1"));
    }
}