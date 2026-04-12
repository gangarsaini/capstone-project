import { useEffect, useState } from "react";
import Header from "../component/Header";
import VideoCard from "../component/VideoCard";
import API from "../services/api";
import StaticSidebar from '../component/StaticSidebar';
import './home.css'
function Home() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="layout">
      <StaticSidebar/>
     <div className="right-portion">
     <Header />
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
     </div>
    </div>
  );
}

export default Home;