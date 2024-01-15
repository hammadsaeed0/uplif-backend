import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategoryScheme = new Schema({
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

});

export const FoodCategory = mongoose.model("FoodCategories", CategoryScheme);
