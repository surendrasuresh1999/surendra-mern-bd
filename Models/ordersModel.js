const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
    total_amount: { type: Number },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
