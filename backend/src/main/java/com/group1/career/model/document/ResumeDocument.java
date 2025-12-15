package com.group1.career.model.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "resume_details")
public class ResumeDocument {
    @Id
    private String id;
    
    private Long userId;

    private List<Map<String, Object>> education;
    private List<Map<String, Object>> projects;
    private List<String> skills;
    private String rawContent;
}

