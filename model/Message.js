import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    sender: {
      type: String,
      required: true,
    },

    chatId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "messages",
  }
);

export default mongoose.model("message", msgSchema);
