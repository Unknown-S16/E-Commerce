const express = require("express");
const router = express.Router();
const Product = require("../models/productModel"); // adjust path as needed

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

module.exports = router;
