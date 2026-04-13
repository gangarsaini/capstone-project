import express from "express";
import {
  addComment,
  getComments,
  deleteComment
} from "../controller/comment.controller.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:videoId", getComments);
router.delete("/:id", authMiddleware, deleteComment);

export default router;