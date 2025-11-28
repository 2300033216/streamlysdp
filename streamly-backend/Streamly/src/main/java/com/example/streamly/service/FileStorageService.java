package com.example.streamly.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
public class FileStorageService {

    private final Path root;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.root = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.root);
        } catch (Exception e) {
            throw new RuntimeException("Cannot create upload directory");
        }
    }

    public String storeFile(MultipartFile file, String folder) {
        try {
            String filename = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
            Path target = this.root.resolve(folder).resolve(filename);

            Files.createDirectories(target.getParent());
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            return "/files/" + folder + "/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("File upload failed");
        }
    }
}
			