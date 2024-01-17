import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResturantScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
});

export const Resturants = mongoose.model("Resturants", ResturantScheme);
