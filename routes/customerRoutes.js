import express from "express";
import {
  register,
  login,
  createCategory,
  getAllCategories,
  createFoodCategory,
  getAllFoodCategories,
  CreateResturant,
  getAllResturant,
  FindDealsByResId,
  CreateResturantDeals,
  CreateFood,
  FindFoodsByResId,
} from "../controller/customerController.js";

const customerRoute = express.Router();

customerRoute.route("/register").post(register);
customerRoute.route("/login").post(login);
customerRoute.route("/createCategory").post(createCategory);
customerRoute.route("/getAllCategory").get(getAllCategories);
customerRoute.route("/createfoodCategory").post(createFoodCategory);
customerRoute.route("/getAllFoodCategory").get(getAllFoodCategories);
customerRoute.route("/createResturant").post(CreateResturant);
customerRoute.route("/getAllResturant").get(getAllResturant);
customerRoute.route("/createResturantDeals").post(CreateResturantDeals);
customerRoute.route("/findDealsByResId").post(FindDealsByResId);
customerRoute.route("/createFood").post(CreateFood);
customerRoute.route("/findFoodsByResId").post(FindFoodsByResId);

export default customerRoute;
