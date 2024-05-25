const express = require("express");
const { createComment, deleteComment, createLikeForComment } = require("../Controllers/commentController");

const requiredAuth = require("../Middleware/UserAuthentication");
const router = express.Router();

router.use(requiredAuth);

// create a new comment
router.post("/", createComment);

// create a new comment
router.delete("/:commentId/:blogId", deleteComment);

// update a comment for add a like 
router.put("/:commentId/:blogId", createLikeForComment);

module.exports = router;
