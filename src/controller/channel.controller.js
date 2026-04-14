import Channel from "../modal/channel.js";
import Video from "../modal/video.js";
import mongoose from "mongoose";

// CREATE CHANNEL
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    const existing = await Channel.findOne({ owner: req.user.id }).populate("videos");

    if (existing) {
      return res.status(400).json({ message: "Channel already exists" });
    }

    const channel = await Channel.create({
      channelName,
      description,
      owner: req.user.id
    });

    res.status(201).json(channel);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// GET MY CHANNEL
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id })
      .populate("videos");

    if (!channel) {
      return res.status(404).json({ message: "No channel found" });
    }

    res.json(channel);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// ADD VIDEO TO CHANNEL
export const addVideoToChannel = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid videoId" });
    }

    const channel = await Channel.findOne({ owner: req.user.id });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (!channel.videos.includes(videoId)) {
      channel.videos.push(videoId);
      await channel.save();
    }

    video.channel = channel._id;

        // 🔥 ADD THIS LINE
        video.channelName = channel.channelName;

        await video.save();

    res.json({ message: "Video added to channel" });

  } catch (error) {
    console.log(error.response.data, "errorr"); //  VERY IMPORTANT
    res.status(500).json({ message: error.message });
  }
};