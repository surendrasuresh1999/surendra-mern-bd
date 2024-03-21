const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product",required: true},
    size: {
      type: String,
      required: true,
    },
    title:{type:String, required:true},
    imageUrl:{type:String, required:true},
    brand: {type:String, required:true},
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    color:{type:String, required: true},
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
