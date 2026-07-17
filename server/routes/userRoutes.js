import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "User route working" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
