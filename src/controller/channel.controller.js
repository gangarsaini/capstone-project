import Channel from "../modal/channel.js";
import Video from "../modal/video.js";
import mongoose from "mongoose";

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

    console.log("videoId:", videoId); // ✅ DEBUG

    if  (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid videoId" });
    }
    

    const channel = await Channel.findOne({ owner: req.user.id });

    console.log("channel please come:", channel); // ✅ DEBUG

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

     const alreadyExists = channel.videos.some(
        (v) => v && v.toString() === videoId
     );

    if (!alreadyExists) {
      channel.videos.push(videoId);
      await channel.save();
      console.log("Video added to channel"); // ✅ DEBUG
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.channel = channel._id;
    await video.save();

    res.json({ message: "Video linked successfully" });

  } catch (error) {
    console.log("ADD VIDEO ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};