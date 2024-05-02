const express = require("express");

const {
  getAllBlogPosts,
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
} = require("../Controllers/blogController");

const requiredAuth = require("../Middleware/WorkoutsAuthentication");

const router = express.Router();

router.use(requiredAuth);

// GET all blog posts
router.get("/", getAllBlogPosts);

// GET specific blog post details
// router.get("/:id", getProductById);

// create a new Blog post
router.post("/", createBlogPost);

// delete a Blog post
router.delete("/:id", deleteBlogPost);

// get blogPost by id
router.get("/:id", getBlogPostById);

module.exports = router;
