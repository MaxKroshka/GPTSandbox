import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = express.Router();

// Signup endpoint
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name").notEmpty().withMessage("Name is required")
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // Check if the email is already taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(200)
          .json({ success: false, message: "Email address already in use" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({ email, password: hashedPassword, name });
      await user.save();

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

      // Return the JWT token
      res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Login endpoint
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find the user with the given email
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

      // Return the JWT token
      res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

export default router;
