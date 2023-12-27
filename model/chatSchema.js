import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
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
