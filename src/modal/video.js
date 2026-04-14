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
  
  views: {
    type: Number,
    default: 0
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel"
  },
  likes: {
    type: Number,
    default:0
  },
  dislikes: {
    type: Number,
    default:0
  },
  category: {
    type: String,
    default: "All"
  },
 
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);