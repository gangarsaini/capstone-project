import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { FaUser } from "react-icons/fa";
import './global.css'
function Channel() {
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const fetchChannel = async () => {
    try {
      const res = await API.get("/channels/me");
      setChannel(res.data);
      //console.log("res",res)
    } catch (err) {
      setChannel(null);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);



  return (
    <div>
        <Header/>
    {channel ?
       (<div className="p-4 channel-user-layout">
        

        <div className="flex">
          <div className="flex justify-center mb-3" >< FaUser /></div>
          <div className="ml-3">
          <h1 className="text-2xl font-bold">{channel.channelName}</h1>
          <p>{channel.description}</p>
          </div>
        </div>
       <h2 className="mt-4 font-bold">Videos</h2>
      <div className="grid grid-cols-3 gap-4 mt-2">
     
       {channel.videos?.map((video) => (
        <div
        key={video._id}
        onClick={() => navigate(`/video/${video._id}`)}
        className="cursor-pointer hover:scale-105 transition"
        >
        <img
            src={video.thumbnailUrl}
            alt=""
            className="w-full h-40 object-cover rounded-lg"
        />

        <div className="mt-2">
            <p className="font-semibold">{video.title}</p>
            <p className="text-gray-500 text-sm">
            {video.views} views
            </p>
        </div>
        </div>
        ))}
      </div>
       <Link
        to="/upload"
        className="bg-blue-500 text-white px-4 py-2 inline-block mt-3 cursor-pointer"
        >
        Upload Video
        </Link>
    </div>)
        :
      <div className="p-4 text-center">
        <h2>No Channel Found</h2>
        <Link to="/create-channel" className="text-blue-500">
          Create Channel
        </Link>
      </div>
    }
   </div>
  );




}

export default Channel;