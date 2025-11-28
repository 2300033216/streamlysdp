import React, { useEffect, useState } from "react";
import api from "../api";
import VideoForm from "../components/VideoForm";

function AdminDashboard() {
  const [videos, setVideos] = useState([]);

  const loadVideos = async () => {
    const res = await api.get("/videos");
    setVideos(res.data);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const deleteVideo = async (id) => {
    await api.delete(`/videos/${id}`);
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="page-container">
      <div className="card-wide">
        <h2>Admin Dashboard</h2>

        <VideoForm onUploaded={(v) => setVideos([v, ...videos])} />

        <h3>Uploaded Videos</h3>
        <div className="video-grid">
          {videos.map((v) => (
            <div key={v.id} className="video-card">
              <h4>{v.title}</h4>
              <video src={v.videoUrl} controls style={{ width: "100%" }} />

              <button onClick={() => deleteVideo(v.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
