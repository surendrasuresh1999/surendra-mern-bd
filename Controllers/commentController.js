const commentModal = require("../Models/commentsModel");

const createComment = async (req, res) => {
  const { _id } = req.user;
  try {
    const resultedComment = await commentModal.create({
      userId: _id.toString(),
      ...req.body,
    });
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

module.exports = { createComment };
