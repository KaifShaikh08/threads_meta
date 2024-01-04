import express from "express";
import {
  createPost,
  deletePost,
  getFeed,
  getPost,
  likeUnlikePost,
  replyToPost,
  getUserPost,
} from "../Controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/get/:id", protectRoute, getPost);
router.get("/user/:username", protectRoute, getUserPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyToPost);
router.get("/getFeed", protectRoute, getFeed);

export default router;
