const express = require("express");

const { createNewQuote, getAllQuotes } = require("../Controllers/quotesController");

const requiredAuth = require("../Middleware/WorkoutsAuthentication");

const router = express.Router();

router.use(requiredAuth);

// GET all quotes
router.get("/", getAllQuotes);

// // GET all User blogs
// router.get("/user", getUserBlogPosts);

// create a new quote post
router.post("/", createNewQuote);

// // delete a Blog post
// router.delete("/:id", deleteBlogPost);

// // get blogPost by id
// router.get("/:id", getBlogPostById);

// // get blogPost by id
// router.put("/:id", dropLikeForPost);

module.exports = router;
