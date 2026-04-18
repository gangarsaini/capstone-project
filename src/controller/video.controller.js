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
     
     return res.status(201).json(video);
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


export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
     console.log(video);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // get channel
    const channel = await Channel.findById(video.channel);
    console.log(channel);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    //MAIN PERMISSION CHECK
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // remove video from channel
    await Channel.findByIdAndUpdate(channel._id, {
      $pull: { videos: id }
    });

    // delete video
    await Video.findByIdAndDelete(id);

    res.json({ message: "Video deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const likeVideo = async (req, res) => {
  const userId = req.user.id;
  const video = await Video.findById(req.params.id);

  if (!video) return res.status(404).json({ message: "Video not found" });

  // remove dislike
  video.dislikes = video.dislikes.filter(
    (id) => id.toString() !== userId
  );

  // toggle like
  if (video.likes.includes(userId)) {
    video.likes = video.likes.filter(
      (id) => id.toString() !== userId
    );
  } else {
    video.likes.push(userId);
  }

  await video.save(); // 🔥 IMPORTANT

  res.json(video);
};


export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    const userId = req.user.id;

    // remove from likes
    video.likes = video.likes.filter(
      (id) => id.toString() !== userId
    );

    // toggle dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      video.dislikes.push(userId);
    }

    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const addView = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true } // 🔥 MUST
    );
 console.log('hello views')
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
 console.log('hello view')
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};