import { useEffect, useState } from "react";
import API from "../services/api";

function Channel() {
  const [channel, setChannel] = useState(null);

  const fetchChannel = async () => {
    try {
      const res = await API.get("/channels/me");
      setChannel(res.data);
    } catch (err) {
      setChannel(null);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  if (!channel) {
    return (
      <div className="p-4 text-center">
        <h2>No Channel Found</h2>
        <a href="/create-channel" className="text-blue-500">
          Create Channel
        </a>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{channel.channelName}</h1>
      <p>{channel.description}</p>

      <h2 className="mt-4 font-bold">Videos</h2>

      <div className="grid grid-cols-3 gap-4 mt-2">
       {channel.videos?.map((video) => (
        <div key={video._id} className="border p-2">
            <img src={video.thumbnailUrl} alt="" />
            <p>{video.title}</p>
        </div>
        ))}
      </div>
      <a
        href="/upload"
        className="bg-blue-500 text-white px-4 py-2 inline-block mt-3"
        >
        Upload Video
        </a>
    </div>
  );
}

export default Channel;