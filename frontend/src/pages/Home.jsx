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

  const categories = [
  "All",
  "Education",
  "Travel",
  "Music",
  "Coding",
  "Fitness"
];
//   const fetchVideos = async () => {
//     try {
//       const res = await API.get("/videos");
//       setVideos(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

const fetchVideos = async () => {
  const res = await API.get(
    `/videos?search=${search}&category=${category}`
  );
  setVideos(res.data);
};

useEffect(() => {
  fetchVideos();
}, [search, category]);

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="layout">
      <StaticSidebar/>
     <div className="right-portion">
     <Header search={search}  setSearch={setSearch} setCategory={setCategory}/>
      <div className="flex gap-2 p-3 overflow-x-auto ">
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