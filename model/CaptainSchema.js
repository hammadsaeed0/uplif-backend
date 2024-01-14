import mongoose from "mongoose";
const Schema = mongoose.Schema;

const captainSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
});

export const Captain = mongoose.model("Captain", captainSchema);
