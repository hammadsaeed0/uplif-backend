import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../model/User.js";
import chatSchema from "../model/chatSchema.js";
import msgSchema from "../model/Message.js";
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

// Create Chat
export const updateChat = catchAsyncError(async (req, res, next) => {
  try {
    const { chatId, price, audioCallPrice, videoCallPrice } = req.body;

    const updatedChat = await chatSchema.findByIdAndUpdate(
      chatId,
      {
        price: price,
        audioCallPrice: audioCallPrice,
        videoCallPrice: videoCallPrice,
      },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Chat
export const FindChat = catchAsyncError(async (req, res, next) => {
  try {
    let { uid } = req.body;

    let chats = await chatSchema.find({
      $or: [{ user: uid }, { other: uid }],
    });

    const chatsWithData = await Promise.all(
      chats.map(async (data) => {
        if (data.user == uid) {
          const findPerson1 = await User.findById(data.other);
          const chatWithPersonData = {
            chatId: data._id,
            userId: data.user,
            other: findPerson1,
            lastMessage: data.lastMessage,
          };
          return chatWithPersonData;
        } else {
          const findPerson1 = await User.findById(data.user);
          const chatWithPersonData = {
            chatId: data._id,
            userId: data.other,
            other: findPerson1,
            lastMessage: data.lastMessage,
          };
          return chatWithPersonData;
        }
      })
    );

    res.json({
      status: "success",
      data: chatsWithData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "invalid parameters",
    });
  }
});

export const GetMessage = catchAsyncError(async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const result = await msgSchema.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add User Images
export const uploadImage = async (req, res, next) => {
  let images = [];
  if (req.files && req.files.avatars) {
    if (!Array.isArray(req.files.avatars)) {
      images.push(req.files.avatars);
    } else {
      images = req.files.avatars;
    }
  }
  let responce = [];
  for (const image of images) {
    try {
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
      const publidId = result.public_id;
      const url = result.url;
      let data = {
        publidId,
        url,
      };
      //  console.log(data);
      responce.push(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error uploading images" });
    }
  }
  // console.log("-->1",responce);
  //     res.json{responce , result}
  res.send(responce);
};
