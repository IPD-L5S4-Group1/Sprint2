package com.group1.career.service;

import com.group1.career.model.document.ResumeDocument;
import com.group1.career.model.entity.Resume;
import com.group1.career.repository.ResumeDocumentRepository;
import com.group1.career.repository.ResumeRepository;
import com.group1.career.service.impl.ResumeServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ResumeServiceTest {

    @Mock
    private ResumeRepository resumeRepository;

    @Mock
    private ResumeDocumentRepository resumeDocumentRepository;

    @InjectMocks
    private ResumeServiceImpl resumeService;

    @Test
    @DisplayName("Test Create Resume")
    public void testCreateResume_Success() {
        Long userId = 100L;
        String title = "Java Resume";
        ResumeDocument detail = new ResumeDocument();

        String mongoId = "mongo_123";
        ResumeDocument savedDoc = ResumeDocument.builder().id(mongoId).build();
        when(resumeDocumentRepository.save(any(ResumeDocument.class))).thenReturn(savedDoc);

        Resume savedResume = Resume.builder().resumeId(1L).mongoDocId(mongoId).build();
        when(resumeRepository.save(any(Resume.class))).thenReturn(savedResume);

        Resume result = resumeService.createResume(userId, title, "Dev", "url", detail);

        assertEquals(mongoId, result.getMongoDocId());
        verify(resumeRepository, times(1)).save(any(Resume.class));
    }

    @Test
    @DisplayName("Test Get Resume Detail")
    public void testGetResume_Success() {
        Long resumeId = 1L;
        Resume mockResume = Resume.builder().resumeId(resumeId).mongoDocId("m_1").build();
        when(resumeRepository.findById(resumeId)).thenReturn(Optional.of(mockResume));
        when(resumeDocumentRepository.findById("m_1")).thenReturn(Optional.of(new ResumeDocument()));

        Resume result = resumeService.getResumeWithDetailCheck(resumeId);
        assertNotNull(result);
    }

    @Test
    @DisplayName("Test Get User Resumes List")
    public void testGetUserResumes_Success() {
        Long userId = 50L;
        List<Resume> mockList = new ArrayList<>();
        mockList.add(Resume.builder().resumeId(1L).title("Resume A").build());
        mockList.add(Resume.builder().resumeId(2L).title("Resume B").build());

        when(resumeRepository.findByUserId(userId)).thenReturn(mockList);

        List<Resume> result = resumeService.getUserResumes(userId);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Resume A", result.get(0).getTitle());
        verify(resumeRepository, times(1)).findByUserId(userId);
    }
}