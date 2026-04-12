import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/video/${video._id}`)}
    >
     <div className="thumnail">
        <img
            src={video.thumbnailUrl}
            onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x216";
            }}
            className="w-full rounded"
        />
     </div>

      <h3 className="font-semibold mt-2">{video.title}</h3>
      <p className="text-sm text-gray-600">{video.channelName}</p>
      <p className="text-sm text-gray-500">{video.views} views</p>
    </div>
  );
}

export default VideoCard;



  