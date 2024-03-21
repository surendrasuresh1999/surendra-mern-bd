const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: String,
    city: String,
    state: String,
    country: String,
    postal_code: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
