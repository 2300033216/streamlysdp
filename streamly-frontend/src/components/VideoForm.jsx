import React, { useState } from "react";
import api from "../api";

function VideoForm({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const upload = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("videoFile", file);

    const res = await api.post("/videos", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onUploaded(res.data);
    e.target.reset();
  };

  return (
    <form className="form" onSubmit={upload}>
      <h3>Upload Video</h3>

      <input
        type="text"
        placeholder="Video Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="video/*"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Upload</button>
    </form>
  );
}

export default VideoForm;
