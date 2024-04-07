const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../Controllers/productController");
const requiredAuth = require("../Middleware/WorkoutsAuthentication");

const router = express.Router();

router.use(requiredAuth);
// GET all workouts
router.get("/", getAllProducts);

// GET specific workout
router.get("/:id", getProductById);

// POST specific workout
router.post("/", createProduct);

// PUT specific workout
router.put("/:id", updateProductById);

// DELETE specific workout
router.delete("/:id", deleteProductById);

module.exports = router;
