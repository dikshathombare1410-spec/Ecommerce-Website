import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateAddToCart } from "../middleware/validateOrder.js";

const router = express.Router();

// All cart routes require the user to be logged in
router.use(protect);

router
  .route("/")
  .get(getCart)
  .post(validateAddToCart, addToCart)
  .delete(clearCart);

router
  .route("/:productId")
  .put(updateCartItem)
  .delete(removeCartItem);

export default router;