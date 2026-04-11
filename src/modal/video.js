import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  description: String,
  channelName: String,
  views: {
    type: Number,
    default: 5000
  },
  likes: {
    type: Number,
    default: 23
  },
  dislikes: {
    type: Number,
    default:2
  },
  category: {
    type: String,
    default: "All"
  }
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);