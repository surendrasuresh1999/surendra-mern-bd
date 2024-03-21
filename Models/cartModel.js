const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalItem: {
      type: Number,
      required: true,
      default: 0,
    },
    totalDiscountedPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
