package com.group1.career.service;

import com.group1.career.model.document.ResumeDocument;
import com.group1.career.model.entity.Resume;

import java.util.List;

public interface ResumeService {
    Resume createResume(Long userId, String title, String targetJob, String fileUrl, ResumeDocument detail);
    Resume getResumeBasic(Long resumeId);
    ResumeDocument getResumeDetail(String mongoDocId);
    List<Resume> getUserResumes(Long userId);
}

