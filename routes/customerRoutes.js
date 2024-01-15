import express from "express";
import {
  register,
  login,
  createCategory,
  getAllCategories,
  createFoodCategory,
  getAllFoodCategories,
} from "../controller/customerController.js";

const customerRoute = express.Router();

customerRoute.route("/register").post(register);
customerRoute.route("/login").post(login);
customerRoute.route("/createCategory").post(createCategory);
customerRoute.route("/getAllCategory").get(getAllCategories);
customerRoute.route("/createfoodCategory").post(createFoodCategory);
customerRoute.route("/getAllFoodCategory").get(getAllFoodCategories);

export default customerRoute;
