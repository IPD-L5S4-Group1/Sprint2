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
    @DisplayName("Test Create Resume - Verify MySQL and MongoDB insertion")
    public void testCreateResume_Success() {
        // 1. Prepare input data
        Long userId = 100L;
        String title = "My Java Resume";
        String targetJob = "Java Developer";
        String fileUrl = "http://oss.example.com/resume.pdf";

        ResumeDocument detail = ResumeDocument.builder()
                .education(new ArrayList<>())
                .skills(new ArrayList<>())
                .build();

        // 2. Mock MongoDB return (Simulate generating a Mongo ID)
        String mongoId = "mongo_12345";
        ResumeDocument savedDoc = ResumeDocument.builder().id(mongoId).userId(userId).build();
        when(resumeDocumentRepository.save(any(ResumeDocument.class))).thenReturn(savedDoc);

        // 3. Mock MySQL return
        Resume savedResume = Resume.builder()
                .resumeId(1L)
                .userId(userId)
                .title(title)
                .mongoDocId(mongoId) // Vital: Verify this ID is linked
                .build();
        when(resumeRepository.save(any(Resume.class))).thenReturn(savedResume);

        // 4. Execute test
        Resume result = resumeService.createResume(userId, title, targetJob, fileUrl, detail);

        // 5. Verify results
        assertNotNull(result);
        assertEquals(mongoId, result.getMongoDocId(), "MySQL record should contain the MongoDB Document ID");
        assertEquals(userId, result.getUserId());

        // 6. Verify interaction order and frequency
        verify(resumeDocumentRepository, times(1)).save(detail); // Saved to Mongo first
        verify(resumeRepository, times(1)).save(any(Resume.class)); // Saved to MySQL second
    }

    @Test
    @DisplayName("Test Get Resume - Verify basic info retrieval")
    public void testGetResume_Success() {
        // 1. Prepare data
        Long resumeId = 1L;
        String mongoId = "mongo_12345";

        Resume mockResume = Resume.builder()
                .resumeId(resumeId)
                .mongoDocId(mongoId)
                .build();

        // 2. Mock MySQL retrieval
        when(resumeRepository.findById(resumeId)).thenReturn(Optional.of(mockResume));

        // 3. Mock Mongo check (Optional, depending on your strictness logic)
        when(resumeDocumentRepository.findById(mongoId)).thenReturn(Optional.of(new ResumeDocument()));

        // 4. Execute test
        Resume result = resumeService.getResumeWithDetailCheck(resumeId);

        // 5. Verify results
        assertNotNull(result);
        assertEquals(resumeId, result.getResumeId());

        // Verify repository call
        verify(resumeRepository, times(1)).findById(resumeId);
    }
}