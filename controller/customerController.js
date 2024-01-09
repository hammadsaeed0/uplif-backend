import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Customer } from "../model/customer.js";
import { RideCategory } from "../model/RideCategories.js";

// register user
export const register = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const email = data?.email;
  const existingUser = await Customer.findOne({ email });
  console.log("user data ===", data);
  if (existingUser) {
    res.status(400).json({ message: "Email already exist", status: "fail" });
  } else {
    const newUser = await Customer.create(data);

    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      data: newUser,
    });
  }
});

// login user
export const login = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Customer.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Email not exist", status: "fail" });
    }
    const user = await Customer.findByCredentials(email, password);
    res.status(200).json({
      status: "success",
      message: "User login successfully",
      data: user,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// create Ride Category
export const createCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const name = data?.name;
  const existCategory = await RideCategory.findOne({ name });
  if (existCategory) {
    res
      .status(400)
      .json({ message: "This ride category already exist", status: "fail" });
  } else {
    const newCategory = await RideCategory.create(data);

    res.status(200).json({
      status: "success",
      message: "Category created successfully",
      data: newCategory,
    });
  }
});

//  get All Categories
export const getAllCategories = catchAsyncError(async (req, res, next) => {
  try {
    const categories = await RideCategory.find();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// Add User Phone Number
export const UpdateUser = catchAsyncError(async (req, res, next) => {
  try {
    const { userId, newName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: newName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get All User
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
