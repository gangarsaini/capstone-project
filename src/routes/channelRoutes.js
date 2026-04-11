import express from "express";
import {
  createChannel,
  getMyChannel,
  addVideoToChannel
} from "../controller/channel.controller.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// create channel
router.post("/", authMiddleware, createChannel);

// get my channel
router.get("/me", authMiddleware, getMyChannel);

// add video
router.post("/add-video", authMiddleware, addVideoToChannel);

export default router;