import express from "express";

import {
  addCategory,
  getCategories,
} from "../controllers/categoryController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// Get all categories
router.get("/", getCategories);


// Add category (Admin only)
router.post("/", protect, isAdmin, addCategory);


export default router;