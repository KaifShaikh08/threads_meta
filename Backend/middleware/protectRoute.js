import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json({ message: "Please Login First" });
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    req.user = user;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  next();
};
export default protectRoute;
