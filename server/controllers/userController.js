import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/tokens.js";

// @desc    Auth user & set token inside a cookie
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError("the email or password is incorrect", 401));
  }

  // validate the password
  // const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = await user.matchPasswords(password);
  console.log(isMatch);

  if (!isMatch) {
    return next(new ApiError("the email or password is incorrect", 401));
  }

  generateToken(res, user._id);
  res.status(200).json({ name: user.name, id: user._id, email: user.email });
});

// @desc    Register new user and auth it with token inside a cookie
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  console.log("reqister user");
  const { name, email, password } = req.body;

  console.log(req.body);

  const userExist = await User.findOne({ email });
  console.log(userExist);
  if (userExist) {
    return next(new ApiError("User already exists", 400));
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "failed to create user" });
  }
});

// @desc    Logout new user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout user" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = {
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json({ data: user });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name?.trim() || user.name;
    user.email = req.body.email?.trim() || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

export { loginUser, registerUser, logoutUser, getProfile, updateProfile };
