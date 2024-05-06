const express = require("express");
const { createComment } = require("../Controllers/commentController");

const requiredAuth = require("../Middleware/WorkoutsAuthentication");
const router = express.Router();

router.use(requiredAuth);

// create a new comment
router.post("/", createComment);

module.exports = router;
