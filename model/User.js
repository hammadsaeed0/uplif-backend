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
    enum: ["user", "supporter"],
    default: "user",
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
    type: Number,
    require: true,
  },
});

export const User = mongoose.model("User", userSchema);
