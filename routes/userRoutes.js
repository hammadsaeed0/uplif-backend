import express from "express";
import {
  register,
  getAllUsers,
  CreateChat,
  FindChat,
  GetMessage,
  UpdateUser,
  updateChat,
  uploadImage,
} from "../controller/userController.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/register").post(register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/CreateChat").post(CreateChat);
router.route("/FindChat").post(FindChat);
router.route("/UpdateUser").post(UpdateUser);
router.route("/updateChat").post(updateChat);
router.route("/getMessage/:chatId").post(GetMessage);
router.route("/uploadImage", upload.array("avatars")).post(uploadImage);
export default router;
