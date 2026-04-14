import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import './videoplyer.css'
import Header from "../component/Header";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
//   const [openDropdown, setOpenDropdown] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [videos, setVideos] = useState([]);

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

 const handleEdit = (comment) => {
  setEditId(comment._id);
  setEditText(comment.text);
};

const handleUpdate = async () => {
  await API.put(`/comments/${editId}`, {
    text: editText
  });

  setEditId(null);
  setEditText("");
  fetchComments();
};




  if (!video) return <p>Loading...</p>;

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="wrapper-plyer">
    <div className="fixed-header"><Header/></div>
    <div className="p-4 layout-as-youtube flex">
        <div className="video-player">
        {/* VIDEO */}
        <iframe
            width="100%"
            height="400"
            src={getEmbedUrl(video.videoUrl)}
            title="video"
            allowFullScreen
        ></iframe>
        <h1 className="text-xl font-bold mt-4">{video.title}</h1>
        <div className="flex justify-between items-center"> 
            <div>
                <p className="text-sm text-gray-600">{video.channelName}</p>
                <p className="text-sm text-gray-500">{video.views} views</p>
            </div>
            <div className="flex flex-row">
               <p className="text-sm text-gray-500 flex items-center mr-1.5">{video.likes}<AiOutlineLike/></p>
              <p className="text-sm text-gray-500 flex items-center">{video.dislikes} <AiOutlineDislike /></p>
            </div>
        </div>
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
                className="bg-blue-400 text-white px-3 rounded-xl cursor-pointer"
            >
                Post
            </button>
            </div>

            {/* List */}
            <div className="mt-4">
            

    
    {comments.map((c) => (
    <div key={c._id} className="border-b py-2">

        {editId === c._id ? (
        <div className="flex gap-2">
            <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border p-1 flex-1"
            />
            <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-2"
            >
            Save
            </button>
        </div>
        ) : (
        <div className="flex justify-between">
            <div>
            <p className="font-semibold">{c.user?.username}</p>
            <p>{c.text}</p>
            </div>

            <div className="flex gap-2">
            <button
                onClick={() => handleEdit(c)}
                className="text-blue-500"
            >
                Edit
            </button>

            <button
                onClick={() => handleDelete(c._id)}
                className="text-red-500"
            >
                Delete
            </button>
            </div>
        </div>
        )}

    </div>
    ))}
    </div>
            
            </div>
        </div>
        <div className="static-section ">
            <div className="wraper_video">
            <iframe
             src="https://www.youtube.com/embed/fHBR1j1kJ1I"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
         />
         <iframe 
          src="https://www.youtube.com/embed/MX48mv73jf8" 
          title="Top 30 JavaScript Interview Questions 2025 | JavaScript Interview Questions &amp; Answers | Intellipaat" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>

        <iframe
         src="https://www.youtube.com/embed/njs0Den1b5Y" 
         title="Javascript Interview Questions" 
         frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         referrerpolicy="strict-origin-when-cross-origin" 
         allowfFllScreen></iframe>
          
          <iframe
             src="https://www.youtube.com/embed/fHBR1j1kJ1I"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
         />
            </div>

        
        </div>
    </div>
   
    </div>
  );
}

export default VideoPlayer;


