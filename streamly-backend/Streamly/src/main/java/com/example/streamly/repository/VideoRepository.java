package com.example.streamly.repository;

import com.example.streamly.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
    // remove all methods that do not match fields in Video.java
}
