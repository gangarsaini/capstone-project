import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function VideoPlayer() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  


  // fetch video
  useEffect(() => {
    API.get("/videos")
      .then((res) => {
        const found = res.data.find((v) => v._id === id);
        console.log("res",res)
        setVideo(found);
      });
  }, [id]);

  // fetch comments
  const fetchComments = async () => {
    const res = await API.get(`/comments/${id}`);
    console.log(res,"videplayer")
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // add comment
  const handleComment = async () => {
    await API.post("/comments", {
      text,
      videoId: id
    });

    setText("");
    fetchComments();
  };

  // delete comment
  const handleDelete = async (commentId) => {
    await API.delete(`/comments/${commentId}`);
    fetchComments();
  };

  if (!video) return <p>Loading...</p>;

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="p-4">

      {/* VIDEO */}
      <iframe
        width="100%"
        height="400"
        src={getEmbedUrl(video.videoUrl)}
        title="video"
        allowFullScreen
      ></iframe>

      <h1 className="text-xl font-bold mt-4">{video.title}</h1>

      {/* COMMENTS */}
      <div className="mt-6">
        <h2 className="font-bold">Comments</h2>

        {/* Add comment */}
        <div className="flex gap-2 mt-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 flex-1"
            placeholder="Add comment..."
          />
          <button
            onClick={handleComment}
            className="bg-blue-500 text-white px-3 rounded-xl"
          >
            Post
          </button>
        </div>

        {/* List */}
        <div className="mt-4">
          {comments.map((c) => (
            <div key={c._id} className="border-b py-2 flex justify-between">
              <div>
                <p className="font-semibold">{c.user?.username}</p>
                <p>{c.text}</p>
              </div>

              <button
                onClick={() => handleDelete(c._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;


