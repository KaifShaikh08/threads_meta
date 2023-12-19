import express from "express";
import {
  SignupUser,
  SigninUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
} from "../Controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", SignupUser);
router.post("/signin", SigninUser);
router.get("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.get("/profile/:query", protectRoute, getUserProfile);

export default router;
