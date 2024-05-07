const express = require("express");
const { createComment, deleteComment } = require("../Controllers/commentController");

const requiredAuth = require("../Middleware/WorkoutsAuthentication");
const router = express.Router();

router.use(requiredAuth);

// create a new comment
router.post("/", createComment);

// create a new comment
router.delete("/:commentId/:blogId", deleteComment);

module.exports = router;
