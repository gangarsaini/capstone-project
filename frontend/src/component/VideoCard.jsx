import { useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useState } from "react";
import API from "../services/api";
function VideoCard({ video }) {
  const navigate = useNavigate();
   const [localVideo, setLocalVideo] = useState(video);
  const handleLike = async () => {
  const res = await API.post(`/videos/${video._id}/like`);
   setLocalVideo(res.data);
};

const handleDislike = async () => {
  const res = await API.post(`/videos/${video._id}/dislike`);
 setLocalVideo(res.data);
};

  return (
    <>
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/video/${video._id}`)}
    >
     <div className="thumnail">
        <img
            src={video.thumbnailUrl}
            onError={(e) => {
                e.target.src = "https://i.ytimg.com/vi/ysz5S6PUM-U/hqdefault.jpg";
            }}
            className="w-full rounded"
        />
     </div>

    
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold mt-2">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.channelName}</p>
                    <p className="text-sm text-gray-500">{video.views} views</p>
                </div>
                <div className="flex flex-row">      
                    {/* <p className="text-sm text-gray-500">{video.likes}<AiOutlineLike/></p>
                    <p className="text-sm text-gray-500">{video.dislikes} <AiOutlineDislike /></p> */}
                   <button
            onClick={(e) => {
                e.stopPropagation();
                handleLike();
            }}
            >
            👍 {localVideo.likes?.length || 0}
            </button>

<button
  onClick={(e) => {
    e.stopPropagation();
    handleDislike();
  }}
>
  👎 {localVideo.dislikes?.length || 0}
</button>
                </div>
            </div>
     </div>
    </>
  );
}

export default VideoCard;



  