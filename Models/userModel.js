const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ratings" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
