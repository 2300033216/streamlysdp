// src/pages/ViewerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

function ViewerDashboard() {
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
        <h2>Viewer Dashboard</h2>
        <p>You can watch videos but cannot add or modify them.</p>
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
      </div>
    </div>
  );
}

export default ViewerDashboard;
