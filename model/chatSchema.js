import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      default: 0, // You can set a default value or adjust as needed
    },
    audioCallPrice: {
      type: String,
      default: 0,
    },
    videoCallPrice: {
      type: String,
      default: 0,
    },
    other: {
      type: String,
      required: true,
    },
    lastMessage: {},
  },
  {
    collection: "chats",
  }
);

export default mongoose.model("chatSchema", chatSchema);
