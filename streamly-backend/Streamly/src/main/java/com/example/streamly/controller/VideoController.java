package com.example.streamly.controller;

import com.example.streamly.model.Video;
import com.example.streamly.repository.VideoRepository;
import com.example.streamly.service.FileStorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoRepository repo;
    private final FileStorageService fileService;

    public VideoController(VideoRepository repo, FileStorageService fileService) {
        this.repo = repo;
        this.fileService = fileService;
    }

    @GetMapping
    public List<Video> getAll() {
        return repo.findAll();
    }

    // ---------- SIMPLE FILE UPLOAD ----------
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Video> uploadVideo(
            @RequestPart("title") String title,
            @RequestPart("videoFile") MultipartFile videoFile
    ) {
        // store file
        String savedPath = fileService.storeFile(videoFile, "videos");

        Video video = new Video();
        video.setTitle(title);
        video.setVideoUrl(savedPath);
        video.setUploadedAt(LocalDateTime.now());

        return ResponseEntity.ok(repo.save(video));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
