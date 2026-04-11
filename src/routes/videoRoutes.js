import express from "express";
import {createVideo, getAllVideos} from "../controller/video.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();
// create video (protected)
router.post("/", authMiddleware, createVideo);
// fetch videos (public)
router.get("/", getAllVideos);

export default router;