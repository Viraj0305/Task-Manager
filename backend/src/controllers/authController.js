import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role });
  res.json(user);
};
export const login = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  // 🔐 SYSTEM ADMIN LOGIN (FIRST CHECK)
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign(
      { id: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      role: "admin"
    });
  }

  // 👤 NORMAL USER LOGIN
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    role: "user"
  });
};
