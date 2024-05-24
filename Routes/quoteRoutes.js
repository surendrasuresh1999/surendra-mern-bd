const express = require("express");

const {
  createNewQuote,
  getAllQuotes,
  dropLikeForQuote,
  deleteQuote,
  updateQuote,
} = require("../Controllers/quotesController");

const requiredAuth = require("../Middleware/WorkoutsAuthentication");

const router = express.Router();

router.use(requiredAuth);

// GET all quotes
router.get("/", getAllQuotes);

// create a new quote post
router.post("/", createNewQuote);

// delete a Blog post
router.delete("/:id", deleteQuote);

// update existing quote
router.put("/:id", updateQuote);

// // get blogPost by id
router.put("/like/:id", dropLikeForQuote);

module.exports = router;
