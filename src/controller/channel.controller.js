import Channel from "../modal/channel.js";
import Video from "../modal/video.js";


// CREATE CHANNEL
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    const existing = await Channel.findOne({ owner: req.user.id });

    if (existing) {
      return res.status(400).json({ message: "Channel already exists" });
    }

    const channel = await Channel.create({
      channelName,
      description,
      owner: req.user.id
    });

    return res.status(201).json(channel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET MY CHANNEL
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id })
      .populate("videos");

    res.json(channel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADD VIDEO TO CHANNEL
export const addVideoToChannel = async (req, res) => {
  try {
    const { videoId } = req.body;

    const channel = await Channel.findOne({ owner: req.user.id });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    channel.videos.push(videoId);
    await channel.save();

    // also update video
    await Video.findByIdAndUpdate(videoId, {
      channel: channel._id
    });

    res.json({ message: "Video added to channel" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};