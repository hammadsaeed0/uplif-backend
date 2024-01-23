import express from "express";
import { register,login } from "../controller/captaincontroller.js";

const Captainrouter = express.Router();

Captainrouter.route("/register").post(register);
Captainrouter.route("/login").post(login);

export default Captainrouter;
