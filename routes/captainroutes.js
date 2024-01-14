import express from "express";
import { register } from "../controller/captaincontroller.js";

const Captainrouter = express.Router();

Captainrouter.route("/register").post(register);

export default Captainrouter;
