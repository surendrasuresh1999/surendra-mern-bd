const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { createCartForEachUser } = require("./cartController");

const createJwtToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.SECRET_STRING, {
    expiresIn: "3d",
  });
};

// this function is admin purposes only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    if (users.length < 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// getParticular user information
const getUserInformation = async (req, res) => {
  const userId = req.user._id.toString();
  try {
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const createNewUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  // Validate that all required fields are provided
  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ error: "all fields must be required!" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    const token = createJwtToken(newUser._id);
    await createCartForEachUser(newUser._id);
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "email, and password must be filled" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({ error: "Invalid password" });
    }
    // create token
    const token = createJwtToken(user._id);
    return res
      .status(200)
      .json({ message: "logged in successfully", user, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, createNewUser, loginUser, getUserInformation };
