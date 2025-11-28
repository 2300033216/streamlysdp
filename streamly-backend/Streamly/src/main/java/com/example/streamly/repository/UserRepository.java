// src/main/java/com/example/streamly/repository/UserRepository.java
package com.example.streamly.repository;

import com.example.streamly.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
