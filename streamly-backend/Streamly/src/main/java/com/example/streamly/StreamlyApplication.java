package com.example.streamly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.example.streamly.config.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties(FileStorageProperties.class)
public class StreamlyApplication {

    public static void main(String[] args) {
        SpringApplication.run(StreamlyApplication.class, args);
    }
}
