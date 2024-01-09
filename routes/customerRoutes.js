import express from "express";
import { register, login, createCategory, getAllCategories } from "../controller/customerController.js";

const customerRoute = express.Router();

customerRoute.route("/register").post(register);
customerRoute.route("/login").post(login);
customerRoute.route("/createCategory").post(createCategory);
customerRoute.route("/getAllCategory").get(getAllCategories);

export default customerRoute;
