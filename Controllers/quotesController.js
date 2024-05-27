const quoteModel = require("../Models/quoteModel");
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

const dropLikeForQuote = async (req, res) => {
  const { _id } = req.user;
  try {
    const quoteObj = await quoteModel.findById({ _id: req.params.id });
    if (!quoteObj) {
      return res.json({ status: 404, message: "Quote is not found" });
    }
    const isUserExist = quoteObj.likedUsers.includes(_id);

    if (isUserExist) {
      quoteObj.likedUsers.pull(_id);
      await quoteObj.save();
      return res.json({ status: 200, message: "You have removed your like" });
    } else {
      quoteObj.likedUsers.push(_id);
      await quoteObj.save();
      return res.json({
        status: 200,
        message: "You have added your opinion",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: error.message, status: error.status });
  }
};

// delete blog post
const deleteQuote = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid quote Id" });
    }

    const quotePost = await quoteModel.findById(req.params.id);
    if (!quotePost) {
      return res.json({ error: "Blog post not found", status: 404 });
    }

    if (quotePost.user.toString() !== userId) {
      return res.json({
        error: "You can't delete other user's posts",
        status: 403,
      });
    }

    await quoteModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Your quote deleted successfully", status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: error.message, status: error.status });
  }
};

// update quote
const updateQuote = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid quote Id" });
    }

    const quotePost = await quoteModel.findById(req.params.id);

    if (!quotePost) {
      return res.json({ error: "Quote not found", status: 404 });
    }

    if (quotePost.user.toString() !== userId) {
      return res.json({
        error: "You can't update other user's quotes",
        status: 403,
      });
    }
    const { author, quote, categoryTag } = req.body;

    await quoteModel.findByIdAndUpdate(req.params.id, {
      author,
      quote,
      categoryTag,
    });

    res.json({ message: "Your quote updated successfully", status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: error.message, status: error.status });
  }
};

module.exports = {
  createNewQuote,
  getAllQuotes,
  dropLikeForQuote,
  deleteQuote,
  updateQuote,
};
