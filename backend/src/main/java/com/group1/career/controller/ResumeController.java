package com.group1.career.controller;

import com.group1.career.common.Result;
import com.group1.career.model.document.ResumeDocument;
import com.group1.career.model.entity.Resume;
import com.group1.career.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Resume API")
@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @Operation(summary = "Create Resume (MySQL + MongoDB)")
    @PostMapping
    public Result<ResumeVO> createResume(@RequestBody CreateResumeRequest request) {
        // 1. 调用 Service 创建简历
        Resume resume = resumeService.createResume(
                request.getUserId(),
                request.getTitle(),
                request.getTargetJob(),
                request.getFileUrl(),
                request.getDetail()
        );

        // 2. 构造返回包含 Detail 的完整对象
        return Result.success(convertToVO(resume, request.getDetail()));
    }

    @Operation(summary = "Get Resume Info (MySQL + Mongo Detail)")
    @GetMapping("/{resumeId}")
    public Result<ResumeVO> getResume(@PathVariable Long resumeId) {
        // 1. 获取 MySQL 基础信息
        Resume resume = resumeService.getResumeWithDetailCheck(resumeId);

        // 2. 获取 MongoDB 详情信息
        ResumeDocument detail = resumeService.getResumeDetail(resume.getMongoDocId());

        // 3. 合并返回
        return Result.success(convertToVO(resume, detail));
    }

    @Operation(summary = "Get User Resumes")
    @GetMapping("/user/{userId}")
    public Result<List<ResumeVO>> getUserResumes(@PathVariable Long userId) {
        List<Resume> resumes = resumeService.getUserResumes(userId);

        // 注意：列表接口如果需要详情，会循环查库，可能会有性能问题。
        // 这里为了匹配前端接口定义，我们暂时做简单聚合。
        // 如果列表不需要显示详情，建议前端修改 Interface 或后端返回 null detail
        List<ResumeVO> resumeVOs = resumes.stream().map(resume -> {
            // 这里为了性能，列表页暂时不查 Mongo Detail，如果前端列表点击详情时会单独调 getResume
            // 或者如果前端强制需要，可以解开下面注释，但建议仅在详情页获取 detail
            // ResumeDocument detail = resumeService.getResumeDetail(resume.getMongoDocId());
            // return convertToVO(resume, detail);
            return convertToVO(resume, null);
        }).collect(Collectors.toList());

        return Result.success(resumeVOs);
    }

    // ================= Helper Methods =================

    private ResumeVO convertToVO(Resume resume, ResumeDocument detail) {
        ResumeVO vo = new ResumeVO();
        BeanUtils.copyProperties(resume, vo); // 复制 MySQL 字段
        vo.setDetail(detail);                 // 设置 Mongo 字段
        return vo;
    }

    // ================= DTO Classes =================

    @Data
    public static class CreateResumeRequest {
        private Long userId;
        private String title;
        private String targetJob;
        private String fileUrl;
        private ResumeDocument detail;
    }

    /**
     * View Object that matches Frontend Interface
     */
    @Data
    public static class ResumeVO {
        private Long resumeId;
        private Long userId;
        private String title;
        private String targetJob;
        private String fileUrl;
        private String status;
        private String mongoDocId;

        // This matches 'detail: ResumeDetail' in frontend
        private ResumeDocument detail;
    }
}