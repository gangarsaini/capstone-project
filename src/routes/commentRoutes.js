import express from "express";
import {
  addComment,
  getComments,
  deleteComment,
  updateComment
} from "../controller/comment.controller.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:videoId", getComments);
router.delete("/:id", authMiddleware, deleteComment);
router.put("/:id", authMiddleware, updateComment);
export default router;