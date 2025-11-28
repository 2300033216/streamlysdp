package com.example.streamly.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String videoUrl;

    private LocalDateTime uploadedAt;

	public void setVideoUrl(String savedPath) {
		// TODO Auto-generated method stub
		
	}

	public void setTitle(String title2) {
		// TODO Auto-generated method stub
		
	}

	public void setUploadedAt(LocalDateTime now) {
		// TODO Auto-generated method stub
		
	}
}
