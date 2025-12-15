package com.group1.career.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resume_id")
    private Long resumeId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "target_job", length = 50)
    private String targetJob;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "version", length = 20)
    @Builder.Default
    private String version = "v1.0";

    @Column(name = "status", length = 20)
    @Builder.Default
    private String status = "UPLOADED"; // UPLOADED, PARSING, COMPLETED

    @Column(name = "mongo_doc_id", length = 50)
    private String mongoDocId;

    @Column(name = "diagnosis_score")
    @Builder.Default
    private Integer diagnosisScore = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

