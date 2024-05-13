const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: "string", required: true },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedUsers: [],
    dislikedUsers: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
