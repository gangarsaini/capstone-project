import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Channel from "./pages/Channel";
import VideoPlayer from "./pages/VideoPlayer";
import Register from "./pages/Register";
import CreateChannel from "./pages/CreateChannel";
import UploadVideo from "./pages/UploadVideo";
import './App.css';
 import 'flowbite';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
       <Route path="/register" element={<Register />} />
       <Route path="/channel" element={<Channel />} />
       <Route path="/create-channel" element={<CreateChannel />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;