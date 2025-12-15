package com.group1.career.controller;

import com.group1.career.common.Result;
import com.group1.career.model.document.ResumeDocument;
import com.group1.career.model.entity.Resume;
import com.group1.career.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Resume API")
@RestController
@RequestMapping("/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @Operation(summary = "Create Resume (MySQL + MongoDB)")
    @PostMapping
    public Result<Resume> createResume(@RequestBody CreateResumeRequest request) {
        return Result.success(resumeService.createResume(
                request.getUserId(),
                request.getTitle(),
                request.getTargetJob(),
                request.getFileUrl(),
                request.getDetail()
        ));
    }

    @Operation(summary = "Get Resume Basic Info")
    @GetMapping("/{id}")
    public Result<Resume> getResume(@PathVariable Long id) {
        return Result.success(resumeService.getResumeBasic(id));
    }

    @Operation(summary = "Get Resume Detail (MongoDB)")
    @GetMapping("/detail/{mongoId}")
    public Result<ResumeDocument> getResumeDetail(@PathVariable String mongoId) {
        return Result.success(resumeService.getResumeDetail(mongoId));
    }

    @Operation(summary = "Get User Resumes")
    @GetMapping("/user/{userId}")
    public Result<List<Resume>> getUserResumes(@PathVariable Long userId) {
        return Result.success(resumeService.getUserResumes(userId));
    }

    @Data
    public static class CreateResumeRequest {
        private Long userId;
        private String title;
        private String targetJob;
        private String fileUrl;
        private ResumeDocument detail;
    }
}

