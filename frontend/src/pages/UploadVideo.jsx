import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleUpload = async () => {
    try {
      const res = await API.post("/videos", {
        title,
        videoUrl,
        thumbnailUrl,
        category,
        description
      });

      const videoId = res.data._id;

      // 🔥 LINK VIDEO TO CHANNEL
      await API.post("/channels/add-video", {
        videoId
      });

      alert("Video uploaded");

      navigate("/channel");

    } catch (error) {
      console.log(error);
      alert("Error uploading video");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="border p-2 m-2 w-80" />
      <input placeholder="Video URL (YouTube link)" onChange={(e) => setVideoUrl(e.target.value)} className="border p-2 m-2 w-80" />
      <input placeholder="Thumbnail URL" onChange={(e) => setThumbnailUrl(e.target.value)} className="border p-2 m-2 w-80" />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} className="border p-2 m-2 w-80" />
      <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="border p-2 m-2 w-80" />

      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        Upload
      </button>
    </div>
  );
}

export default UploadVideo;