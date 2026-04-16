import { useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
function VideoCard({ video }) {
  const navigate = useNavigate();

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
                    <p className="text-sm text-gray-500">{video.likes}<AiOutlineLike/></p>
                    <p className="text-sm text-gray-500">{video.dislikes} <AiOutlineDislike /></p>
                </div>
            </div>
     </div>
    </>
  );
}

export default VideoCard;



  