import User from "../Models/userModel.js";
import Post from "../Models/postModel.js";
import { v2 as Cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  const { postedBy, text } = req.body;
  let { img } = req.body;

  try {
    if (!postedBy || !text)
      return res.json({ error: "postedBy and text fields are required" });

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized to create post" });

    const maxLength = 500;
    if (text.length > 500)
      return res.json({
        error: `Text must be contain less than ${maxLength} characters`,
      });

    if (img) {
      const uploadedResponse = await Cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const post = await Post.create({ postedBy, text, img });

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      return res.json({ message: "Post found", post });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.json({ error: "Post not found" });
  }
  if (post.postedBy.toString() !== req.user._id.toString()) {
    return res.json({ error: "Unauthorized to delete this post" });
  }
  await Post.findByIdAndDelete(id);
  return res.json({ message: "Deleted Successfully" });
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.json({ error: "Post not found" });

    const userLikedPost = await post.likes.includes(userId);
    if (userLikedPost) {
      //Unlike
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      return res.json({ message: "You Unlike this post" });
    } else {
      //Like Post
      post.likes.push(userId);
      await post.save();
      return res.json({ messag: "You like this post" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const replyToPost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user._id;
  const { username, userProfilePic } = req.user;
  const { text } = req.body;

  if (!text) {
    return res.json({ error: "Text field are required" });
  }

  const post = await Post.findById(postId);
  if (!post) {
    return res.json({ message: "Post not found" });
  }

  const reply = { userId, userProfilePic, username };
  await post.replies.push(reply);
  return res.json({ message: "Replied Successfully ", post });
};

export const getFeed = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User not found" });

  const following = user.following;
  const feedPost = await Post.find({ postedBy: { $in: following } }).sort({
    createdAt: -1,
  });

  return res.json(feedPost);
};
