const cartModel = require("../Models/cartModel");
const productModel = require("../Models/productModel");
const cartItemModel = require("../Models/cartItemModel");
const mongoose = require("mongoose");

// this function will create cart for each user
const createCartForEachUser = async (userInfo) => {
  try {
    const cart = new cartModel({
      user: userInfo._id, // Associate the cart with the user
      cartItems: [], // Initially, the cart may be empty
      totalPrice: 0,
      totalItem: 0,
      totalDiscountedPrice: 0,
      discount: 0,
    });
    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(404).json({ error: "error" });
  }
};

// this function will return user cart information
const getCartDetails = async (req, res) => {
  const userId = await req.user._id.toString();
  try {
    if (!userId) {
      return res.status(404).json({ error: "User ID is required" });
    }
    const userCart = await cartModel.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found for user" });
    }
    const userCartItems = await cartModel
      .findOne({ user: userId })
      .populate("cartItems");
    // console.log('cartItems',userCartItems); it will return respected user whole cart items
    userCart.cartItems = userCartItems.cartItems;
    return res.status(200).json(userCart);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// this function is additem into user cart
const addCartItem = async (req, res) => {
  const { _id, size, quantity, color } = req.body;

  // the below userId is coming from verifyToken function we don't need to send this from frontend
  const userId = req.user._id.toString();
  try {
    const product = await productModel.findById(_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Find the user's cart
    const userCart = await cartModel.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ error: "User's cart not found" });
    }

    // Check if the item already exists in the cart
    const isPresent = await cartItemModel.findOne({
      cartId: userCart._id,
      productId: product._id,
      size,
      userId,
    });
    if (!isPresent) {
      const cartItem = await cartItemModel.create({
        // this product id is using for display full product information in modal view
        productId: product._id,
        cartId: userCart._id,
        title: product.title,
        quantity,
        userId: req.user._id,
        imageUrl: product.imageUrl,
        brand: product.brand,
        price: product.price * quantity,
        size,
        color,
        discountedPrice: product.disCountPrice * quantity,
      });
      userCart.cartItems.push(cartItem);
      await userCart.save();
    } else {
      isPresent.quantity += 1;
    }
    // await Promise.all([userCart.save(), isPresent.save()]);
    return res
      .status(200)
      .json({ message: "product added successfully", userCart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  // console.log("updateCartItem", req.params.id);
  const userId = req.user._id.toString();
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(200).json({ error: "No Such CartItem found" });
    }
    const cartItem = await cartItemModel.findById({ _id: req.params.id });
    if (!cartItem) {
      return res.status(500).json({ error: "cartItem not found" });
    }
    // it means particular user cart and cartItem will be true then item will be updated accordingly
    if (cartItem.userId && userId) {
      const userCartItem = await cartItemModel.findOneAndUpdate({_id:req.params.id},{...req.body},{ new: true });
      // console.log("cartItem", userCartItem);
      return res.status(200).json({ message: "CartItem updated successfully",userCartItem });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  // console.log("deleteCartItem", req.params.id);
  const userId = req.user._id.toString();
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(200).json({ error: "No Such CartItem found" });
    }
    const cartItem = await cartItemModel.findById({ _id: req.params.id });

    if (!cartItem) {
      return res.status(500).json({ error: "cartItem not found" });
    }
    // it means particular user cart and cartItem will be true then item will be deleted
    if (cartItem.userId && userId) {
      const userCartItem = await cartItemModel.findByIdAndDelete({
        _id: req.params.id,
      });
      console.log("cartItem", userCartItem);
      return res.status(200).json({ message: "CartItem deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCartForEachUser,
  getCartDetails,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};
