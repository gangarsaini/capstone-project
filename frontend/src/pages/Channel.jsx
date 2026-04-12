import { useEffect, useState } from "react";
import API from "../services/api";

function Channel() {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    API.get("/channels/me")
      .then((res) => setChannel(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!channel) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{channel.channelName}</h1>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {channel.videos.map((video) => (
          <div key={video._id}>{video.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Channel;