import { useEffect, useState } from "react";
import Header from "../component/Header";
import VideoCard from "../component/VideoCard";
import API from "../services/api";
import StaticSidebar from '../component/StaticSidebar';
import './home.css'
function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const token = localStorage.getItem("token");
  const categories = [
  "All",
  "Education",
  "Travel",
  "Music",
  "Coding",
  "Fitness"
];


const fetchVideos = async () => {
    if (!token) return;
  const res = await API.get(
    `/videos?search=${search}&category=${category}`
  );
  setVideos(res.data);
};

useEffect(() => {
    if (!token) return;
  fetchVideos();
}, [search, category]);

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="layout">
      <StaticSidebar/>
     <div className="right-portion">
     <Header 
      search={search}  
     setSearch={setSearch} 
     setCategory={setCategory}
     />

      <div className="flex gap-2 p-3 overflow-x-auto scroll-func">
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                    category === cat ? "bg-black text-white" : "bg-gray-200"
                }`}
                >
                {cat}
                </button>
            ))}
        </div>
        {token 
        ? 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
       </div>
         :
        <div className="grid grid-cols-1 gap-4 p-4">
        <h2 className="text-2xl font-bold justify-center grid">Welcome to YouTube Clone</h2>
        <p className="mt-2 text-gray-500 justify-center grid">
          Please login to watch videos
        </p>
        </div>
         }
   
     </div>
    </div>
  );
}

export default Home;