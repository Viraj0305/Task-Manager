import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Task from "../models/Task.js";


const router = express.Router();

router.get("/users", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const users = await User.find().select("-password");
  res.json(users);
});
router.delete("/users/:id", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  // delete user's tasks first
  await Task.deleteMany({ user: req.params.id });

  // delete user
  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User and their tasks deleted" });
});

export default router;
