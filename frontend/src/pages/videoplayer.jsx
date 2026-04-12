import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    API.get("/videos")
      .then((res) => {
        const found = res.data.find((v) => v._id === id);
        setVideo(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!video) return <p className="p-4">Loading...</p>;

  // 🔥 Convert YouTube URL to embed
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="p-4">
      {/* VIDEO PLAYER */}
      <div className="w-full h-[400px]">
        <iframe
          width="100%"
          height="100%"
          src={getEmbedUrl(video.videoUrl)}
          title="video"
          allowFullScreen
        ></iframe>
      </div>

      {/* VIDEO DETAILS */}
      <h1 className="text-xl font-bold mt-4">{video.title}</h1>
      <p className="text-gray-600">{video.channelName}</p>
      <p className="mt-2">{video.description}</p>
    </div>
  );
}

export default VideoPlayer;