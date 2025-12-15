package com.group1.career.repository;

import com.group1.career.model.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {
    Optional<UserAuth> findByIdentifierAndIdentityType(String identifier, String identityType);
    List<UserAuth> findByUserId(Long userId);
}

