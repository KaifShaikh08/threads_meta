import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSendCookie } from "../utils/helpers/generateTokenAndSeneCookie.js";
import { v2 as Cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const SignupUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user)
      return res.json({
        success: false,
        error: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    if (newUser) generateTokenAndSendCookie(newUser._id, res);
    return res.json({
      success: true,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      bio: newUser.bio,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(`Error in signup: ${error}`);
    return res.json({ error: error.message });
  }
};

export const SigninUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });
    generateTokenAndSendCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
    });
    res.status(200).json({
      message: "User Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logoutUser: ", error.message);
  }
};

export const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id); //The person you are going to followe/unfollow
    const currentUser = await User.findById(req.user._id); //You
    if (id === req.user._id.toString())
      return res.json({ message: "You cannot follow/unfollow yourself" });
    if (!currentUser || !userToModify)
      return res.json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      ////////////////Unfollow User///////////////////////

      //Removing from yours following list
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      //Removing from user followers list that you followed
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });

      return res
        .status(200)
        .json({ message: `You Unfollowed ${userToModify.username}` });
    } else {
      //////////////////Follow User////////////////////////////////////////

      //Adding to yours following list
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      //Adding you to the users followers list that you followed
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      return res
        .status(200)
        .json({ message: `You Followed ${userToModify.username}` });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, username, bio, password } = req.body;
    let { profilePic } = req.body;
    const userId = req.user._id;
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other profile's " });
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await Cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await Cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;

    user = await user.save();
    user.password = null;
    return res
      .status(201)
      .json({ message: "Profile Updated Successfully", user });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const { query } = req.params;
  let user;

  if (mongoose.Types.ObjectId.isValid(query)) {
    user = await User.findOne({ _id: query })
      .select("-password")
      .select("-updatedAt");
  } else {
    user = await User.findOne({ username: query })
      .select("-password")
      .select("-updatedAt");
  }

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  } else {
    return res.json(user);
  }
};
