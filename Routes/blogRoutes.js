const express = require("express");

const {
  getAllBlogPosts,
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getUserBlogPosts,
  dropLikeForPost,
} = require("../Controllers/blogController");

const requiredAuth = require("../Middleware/WorkoutsAuthentication");

const router = express.Router();

router.use(requiredAuth);

// GET all blog posts
router.get("/", getAllBlogPosts);

// GET all User blogs
router.get("/user", getUserBlogPosts);

// create a new Blog post
router.post("/", createBlogPost);

// delete a Blog post
router.delete("/:id", deleteBlogPost);

// get blogPost by id
router.get("/:id", getBlogPostById);

// get blogPost by id
router.put("/:id", dropLikeForPost);

module.exports = router;
