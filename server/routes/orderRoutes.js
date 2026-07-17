import express from "express";
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  validateCreateOrder,
  validateOrderStatus,
} from "../middleware/validateOrder.js";

const router = express.Router();

// All order routes require the user to be logged in
router.use(protect);

// Place a new order & Get all orders (Admin)
router
  .route("/")
  .post(validateCreateOrder, createOrder)
  .get(isAdmin, getAllOrders);

// Logged-in user's own order history
router.get("/my-orders", getMyOrders);

// Get order by ID
router.get("/:id", getOrderById);

// Cancel Order
router.put("/:id/cancel", cancelOrder);

// Update Order Status (Admin)
router.put("/:id/status", isAdmin, validateOrderStatus, updateOrderStatus);

export default router;