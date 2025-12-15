package com.group1.career.service.impl;

import com.group1.career.model.document.ResumeDocument;
import com.group1.career.model.entity.Resume;
import com.group1.career.repository.ResumeDocumentRepository;
import com.group1.career.repository.ResumeRepository;
import com.group1.career.common.ErrorCode;
import com.group1.career.exception.BizException;
import com.group1.career.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeDocumentRepository resumeDocumentRepository;

    @Override
    @Transactional
    public Resume createResume(Long userId, String title, String targetJob, String fileUrl, ResumeDocument detail) {
        // 1. Save Document to MongoDB
        detail.setUserId(userId);
        ResumeDocument savedDoc = resumeDocumentRepository.save(detail);

        // 2. Save Metadata to MySQL
        Resume resume = Resume.builder()
                .userId(userId)
                .title(title)
                .targetJob(targetJob)
                .fileUrl(fileUrl)
                .mongoDocId(savedDoc.getId())
                .build();
        
        return resumeRepository.save(resume);
    }

    @Override
    public Resume getResumeBasic(Long resumeId) {
        return resumeRepository.findById(resumeId)
                .orElseThrow(() -> new BizException(ErrorCode.RESUME_NOT_FOUND));
    }

    @Override
    public Resume getResumeWithDetailCheck(Long resumeId) {
        // 1. Get from MySQL
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new BizException(ErrorCode.RESUME_NOT_FOUND));

        // 2. Check MongoDB (Mock or Real check)
        if (resume.getMongoDocId() != null) {
            // Just for demonstration: ensure it exists or log it
            resumeDocumentRepository.findById(resume.getMongoDocId())
                    .ifPresent(doc -> log.info("Found Mongo Detail for Resume {}: {}", resumeId, doc.getId()));
        }
        
        return resume;
    }

    @Override
    public ResumeDocument getResumeDetail(String mongoDocId) {
        return resumeDocumentRepository.findById(mongoDocId)
                .orElseThrow(() -> new BizException("Resume detail not found"));
    }

    @Override
    public List<Resume> getUserResumes(Long userId) {
        return resumeRepository.findByUserId(userId);
    }
}

