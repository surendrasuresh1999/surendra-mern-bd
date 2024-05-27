const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    author: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    likedUsers: [],
    categoryTag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
