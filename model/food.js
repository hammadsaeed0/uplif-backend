import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FoodScheme = new Schema({
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
  offer: {
    type: String,
  },
  description: {
    type: String,
  },
  actualPrice: {
    type: String,
  },
  finalPrice: {
    type: String,
  },
  resturantId:{
    type: String,
  },
  dealId:{
    type: String,
  }
});

export const Foods = mongoose.model("Foods", FoodScheme);
