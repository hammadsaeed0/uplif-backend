import express from "express";
import {
  register,
  getAllUsers,
  CreateChat,
  FindChat,
  GetMessage,
  UpdateUser,
  updateChat,
} from "../controller/userController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/CreateChat").post(CreateChat);
router.route("/FindChat").post(FindChat);
router.route("/UpdateUser").post(UpdateUser);
router.route("/updateChat").post(updateChat);
router.route("/getMessage/:chatId").post(GetMessage);
export default router;
