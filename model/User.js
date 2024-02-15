import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GalleryItemSchema = new Schema({
  publicId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    // required: [true, "Please Enter Your Name"],
    default: "User",
  },
  usertype: {
    type: String,
    enum: ["male", "supporter"],
    default: "user",
  },
  gender: {
    type: String,
    enum: ["male", "female", "null"], // Specify the allowed values
    default: "null", // Initial value is 'pending'
  },
  age: {
    type: String,
    default: "",
  },
  audioCall: {
    type: String,
    enum: ["available", "notavailable"], // Specify the allowed values
    default: "available",
  },
  videoCall: {
    type: String,
    enum: ["available", "notavailable"], // Specify the allowed values
    default: "available",
  },
  chat: {
    type: String,
    enum: ["available", "notavailable"], // Specify the allowed values
    default: "available",
  },
  walletAmount:{
    type:String,
    default:"0.00",
  },
  profileImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/ddu4sybue/image/upload/v1703621151/default_kg8cg0.png",
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  chatPrice: {
    type: String,
    default: "",
  },
  audioCallPrice: {
    type: String,
    default: "",
  },
  videoCallPrice: {
    type: String,
    default: "",
  },
});

export const User = mongoose.model("User", userSchema);
