import express from "express";

import {
  addProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// Get all products
router.get("/", getProducts);


// Get single product
router.get("/:id", getProductById);


// Add product (Admin only)
router.post("/", protect, isAdmin, addProduct);


export default router;