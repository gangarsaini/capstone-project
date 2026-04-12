function VideoCard({ video }) {
  return (
    <div className="cursor-pointer">
      <img
        src={video.thumbnailUrl}
        alt=""
        className="w-full rounded"
      />

      <h3 className="font-semibold mt-2">{video.title}</h3>
      <p className="text-sm text-gray-600">{video.channelName}</p>
      <p className="text-sm text-gray-500">{video.views} views</p>
    </div>
  );
}

export default VideoCard;