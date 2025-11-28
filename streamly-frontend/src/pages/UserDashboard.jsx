// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import VideoForm from "../components/VideoForm";

function UserDashboard() {
  const [videos, setVideos] = useState([]);

  const loadVideos = async () => {
    const res = await api.get("/videos");
    setVideos(res.data);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="page-container">
      <div className="card-wide">
        <h2>User Dashboard</h2>
        <VideoForm onCreated={(v) => setVideos((prev) => [v, ...prev])} />

        <h3>All Videos</h3>
        <VideoList videos={videos} />
      </div>
    </div>
  );
}

function VideoList({ videos }) {
  return (
    <div className="video-grid">
      {videos.map((v) => (
        <div key={v.id} className="video-card">
          <img
            src={v.thumbnailUrl || "https://via.placeholder.com/200x120"}
            alt={v.title}
          />
          <h4>{v.title}</h4>
          <p>{v.description}</p>
          <video src={v.videoUrl} controls style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
