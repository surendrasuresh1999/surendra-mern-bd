const User = require("../Models/userModel");
const blogModel = require("../Models/blogModel");
const quoteModel = require("../Models/quoteModel");
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
  const { _id } = req.user;
  const userId = _id.toString();
  try {
    if (!userId) {
      return res.json({ status: 404, message: "User not found" });
    }
    const blogs = await blogModel.find({ user: userId });
    const quotes = await quoteModel.find({ user: userId });
    return res.json({
      status: 200,
      blogs: blogs.length,
      quotes: quotes.length,
    });
  } catch (error) {
    return res.json({ status: 400, error: error.message });
  }
};

const createNewUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validate email format
  // if (!validator.isEmail(email)) {
  //   return res.status(400).json({ error: "Invalid email format" });
  // }

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, message: "email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const token = createJwtToken(newUser._id);
    await createCartForEachUser(newUser._id);
    res
      .status(201)
      .json({ status: true, message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ status: false, message: "Invalid password" });
    }
    // create token
    const token = createJwtToken(user._id);
    return res
      .status(200)
      .json({ status: true, message: "logged in successfully", user, token });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { getAllUsers, createNewUser, loginUser, getUserInformation };
