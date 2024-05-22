const blogModel = require("../Models/blogModel");
const quoteModel = require("../Models/quoteModel");
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");

// create a new blog post
const createNewQuote = async (req, res) => {
  const { _id } = req.user;
  try {
    const resultQuotePost = await quoteModel.create({
      user: _id.toString(),
      ...req.body,
    });
    res.json({
      message: "Quote created Successfully",
      resultQuotePost,
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.json({ status: 400, message: error.message });
  }
};

// get all blog posts
const getAllQuotes = async (req, res) => {
    const { _id } = req.user;
    try {
      // Fetch all blog posts
      const allQuotes = await quoteModel.find({});
  
      res.json({
        status: 200,
        message: "Fetching all blogs",
        quotes: allQuotes,
      });
    } catch (error) {
      console.log("Error: ", error.message);
      res.json({ status: 400, message: error.message });
    }
  };

module.exports = { createNewQuote,getAllQuotes };
