const express = require("express");
const { getCartDetails, addCartItem, updateCartItem, deleteCartItem } = require("../Controllers/cartController");
const requiredAuth  = require("../Middleware/WorkoutsAuthentication");

const router = express.Router();

router.use(requiredAuth)

// get user cart
router.get("/", getCartDetails);

// add product to user cart
router.post("/addProduct",addCartItem);

// add product to user cart
router.put("/:id",updateCartItem);

// add product to user cart
router.delete("/:id",deleteCartItem);

module.exports = router;