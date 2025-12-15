package com.group1.career.repository;

import com.group1.career.model.document.ResumeDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeDocumentRepository extends MongoRepository<ResumeDocument, String> {
}

