const commentModal = require("../Models/commentsModel");

const createComment = async (req, res) => {
  const { _id } = req.user;
  try {
    const resultedComment = await commentModal.create({
      userId: _id.toString(),
      ...req.body,
    });
    // console.log(resultedComment);
    res.json({
      message: "Comment created Successfully",
      resultedComment,
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ status: 400, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { _id } = req.user;
  const { commentId, blogId } = req.params;
  try {
    const comment = await commentModal.findById({ _id: commentId });
    const { userId } = comment;

    if (!comment) {
      res.json({
        message: "comment information not found",
        status: 404,
      });
    }

    if (userId.toString() === _id.toString()) {
      const deletedComment = await commentModal.findByIdAndDelete({
        _id: commentId,
        blogId: blogId,
      });
      return res.json({
        message: "Your comment deleted Successfully",
        deletedComment,
        status: 200,
      });
    } else {
      return res.json({
        message: "You can't delete others comment",
        status: 400,
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.json({ status: 400, message: error.message });
  }
};

const createLikeForComment = async (req, res) => {
  const { _id } = req.user;
  const { blogId, commentId } = req.params;
  const { type } = req.body;

  try {
    const comment = await commentModal.findById({
      _id: commentId,
      blogId: blogId,
    });
    if (!comment) {
      return res.json({ status: 404, message: "Comment not found" });
    }

    const isUserLiked = comment.likedUsers.includes(_id);
    const isUserDisliked = comment.dislikedUsers.includes(_id);

    if (type === "like") {
      if (isUserLiked) {
        comment.likedUsers.pull(_id); // Remove like
        await comment.save();
        return res.json({ status: 200, message: "You have removed your like" });
      } else {
        if (isUserDisliked) {
          comment.dislikedUsers.pull(_id); // Remove dislike
        }
        comment.likedUsers.push(_id); // Add like
        await comment.save();
        return res.json({
          status: 200,
          message: "You have added your opinion",
        });
      }
    } else {
      if (isUserDisliked) {
        comment.dislikedUsers.pull(_id); // Remove dislike
        await comment.save();
        return res.json({
          status: 200,
          message: "You have removed your dislike",
        });
      } else {
        if (isUserLiked) {
          comment.likedUsers.pull(_id); // Remove like
        }
        comment.dislikedUsers.push(_id); // Add dislike
        await comment.save();
        return res.json({
          status: 200,
          message: "You have added your opinion",
        });
      }
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.json({ status: 400, message: error.message });
  }
};

module.exports = { createComment, deleteComment, createLikeForComment };
