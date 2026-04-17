import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const[error,setError] = useState("")
  const navigate = useNavigate();

  const handleUpload = async () => {
  try {

    // Check channel exists
    try {
      await API.get("/channels/me");
    } catch {
      setError("Please create a channel first");
      return;
    }

    //  Validate inputs
    if (!title || !videoUrl || !thumbnailUrl || !category || !description) {
      setError("All fields are required");
      return;
    }

    // Create video
    const res = await API.post("/videos", {
      title,
      videoUrl,
      thumbnailUrl,
      category,
      description
    });

    const videoId = res.data._id;
        if (!videoId) {
        setError("Video not created properly");
        return;
        }
    //console.log("VIDEO RESPONSE:", res.data); 

    // Link video to channel
   await API.post("/channels/add-video", {
      videoId
    });
    setError("Video uploaded");
    navigate("/channel");

  } catch (error) {
    //console.log(error.response?.data || error.message);
    setError("Error uploading video");
  }
};

//console.log(res2,res)

  return (
   <div>
      <Header/>
     <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2 mp-2">Upload Video</h2>
     <input name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="border p-2 m-2 w-80 rounded-xl" />
      <input placeholder="Video URL (YouTube link)" onChange={(e) => setVideoUrl(e.target.value)} className="border p-2 m-2 w-80 rounded-xl" />
      <input placeholder="Thumbnail URL" onChange={(e) => setThumbnailUrl(e.target.value)} className="border p-2 m-2 w-80 rounded-xl" />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} className="border p-2 m-2 w-80 rounded-xl" />
      <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="border p-2 m-2 w-80 rounded-xl" />
       <p className="text-red-500 text-center text-[14px]">{error}</p>
      <button
        onClick={handleUpload}
        className="bg-green-800 text-white px-4 py-2 mt-2 cursor-pointer rounded-xl"
      >
        Upload
      </button>
    </div>
   </div>
  );
}

export default UploadVideo;