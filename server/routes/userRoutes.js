import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddlware.js";

const router = Router();

// @desc:   create new user
router.post("/register", registerUser);

// @desc:   login user
router.post("/login", loginUser);

// @desc:   logout user
router.post("/logout", logoutUser);

// @desc:   get and update user profile
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

export default router;
