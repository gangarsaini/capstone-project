import Comment from "../modal/comment.js";


// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    const comment = await Comment.create({
      text,
      video: videoId,
      user: req.user.id
    });

    return res.status(201).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET COMMENTS FOR VIDEO
export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

     return res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await Comment.findByIdAndDelete(id);

   return  res.json({ message: "Comment deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update COMMENT
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const updated = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};