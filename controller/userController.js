import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../model/User.js";
import chatSchema from "../model/chatSchema.js";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});

// Add User Phone Number
export const register = catchAsyncError(async (req, res, next) => {
  const { name, phoneNumber } = req.body;

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ phoneNumber });
  if (existingUser) {
    res.status(201).json({
      success: true,
      message: "User login successfully",
      data: existingUser,
    });
  } else {
    const newUser = await User.create({
      name,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
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

// Create Chat
export const CreateChat = catchAsyncError(async (req, res, next) => {
  let { user, other } = req.body;
  try {
    const old = await chatSchema.findOne({
      $or: [
        { user, other },
        { user: user, other: other },
      ],
    });
    if (old != null) {
      return res.json({
        status: "error",
        message: "Chat is already available",
      });
    }
    let chat = await chatSchema.create({
      user,
      other,
    });
    res.json({
      status: "success",
      data: chat,
    });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: "Invalid parameters" });
  }
});

// Get Chat
export const FindChat = catchAsyncError(async (req, res, next) => {
  try {
    let { uid } = req.body;

    let chats = await chatSchema.find({
      $or: [{ user: uid }, { other: uid }],
    });

    // const chatsWithData = await Promise.all(
    //   chats.map(async (data) => {
    //     if (data.user == uid) {
    //       const findPerson = await User.findById(data.user);
    //       const findPerson1 = await User.findById(data.other).select(
    //         "_id gallery name"
    //       );
    //       const chatWithPersonData = {
    //         chatId: data._id,
    //         userId: data.user,
    //         other: findPerson1,
    //         lastMessage: data.lastMessage,
    //         unread: data.unread,
    //         archive: data.archive,
    //         mute: data.mute,
    //       };
    //       return chatWithPersonData;
    //     } else {
    //       const findPerson = await User.findById(data.user);
    //       const findPerson1 = await User.findById(data.user).select(
    //         "_id gallery name"
    //       );
    //       const chatWithPersonData = {
    //         chatId: data._id,
    //         userId: data.other,
    //         other: findPerson1,
    //         lastMessage: data.lastMessage,
    //         unread: data.unread,
    //         archive: data.archive,
    //         mute: data.mute,
    //       };
    //       return chatWithPersonData;
    //     }
    //   })
    // );

    res.json({
      status: "success",
      data: chats,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "invalid parameters",
    });
  }
});
