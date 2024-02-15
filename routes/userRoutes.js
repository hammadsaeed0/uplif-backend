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
  getUser,
  deleteUser,
  login,
} from "../controller/userController.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getAllUsers").get(getAllUsers);
router.route("/CreateChat").post(CreateChat);
router.route("/FindChat").post(FindChat);
router.route("/UpdateUser").post(UpdateUser);
router.route("/updateChat").post(updateChat);
router.route("/getMessage").post(GetMessage);
router.route("/getUser/:userId").get(getUser);
router.route("/deleteUser/:userId").delete(deleteUser);
router.route("/uploadImage", upload.array("avatars")).post(uploadImage);
export default router;
