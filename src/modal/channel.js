import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: String,
  channelBanner: String,
  subscribers: {
    type: Number,
    default: 0
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  channel: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Channel"
}
}, { timestamps: true });

export default mongoose.model("Channel", channelSchema);