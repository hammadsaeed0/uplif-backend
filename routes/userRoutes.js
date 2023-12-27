import express from "express";
import {
  register,
  getAllUsers,
  CreateChat,
  FindChat,
} from "../controller/userController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/CreateChat").post(CreateChat);
router.route("/FindChat").get(FindChat);

export default router;
