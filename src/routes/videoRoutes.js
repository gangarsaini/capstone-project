import express from "express";
import {createVideo, getAllVideos, deleteVideo,likeVideo,dislikeVideo,addView,getVideoById} from "../controller/video.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();
// create video (protected)
router.post("/", authMiddleware, createVideo);
// fetch videos (public)
router.get("/", getAllVideos);

router.delete("/:id", authMiddleware, deleteVideo);
router.post("/:id/like", authMiddleware, likeVideo);
router.post("/:id/dislike", authMiddleware, dislikeVideo);
router.put("/:id/view", addView);
router.get("/:id", getVideoById);




export default router;