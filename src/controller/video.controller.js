import Video from "../modal/video.js";
import Channel from "../modal/channel.js";


//CREATE VIDEO
export const createVideo = async (req, res) => {
  try {
    const { title, thumbnailUrl, videoUrl, description,category, channel, views, likes, dislikes, } = req.body;
    if (!title || !thumbnailUrl || !videoUrl){
      return res.status(400).json({ message: "Required fields missing" });
    }
    const channelData = await Channel.findById(channel);
    console.log("Hello data")
    const video = await Video.create({
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
      channel,
      views,
      likes,
      dislikes
    });
    //  return res.status(201).json({video:video});
    res.json(video)
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



// FETCH ALL VIDEOS (HOMEPAGE)
export const getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    const videos = await Video.find(query).sort({ createdAt: -1 });

    res.json(videos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};