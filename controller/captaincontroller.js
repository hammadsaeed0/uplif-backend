import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Captain } from "../model/CaptainSchema.js";

export const register = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const phoneNumber = data?.phoneNumber;
  const existingCaptain = await Captain.findOne({ phoneNumber });
  if (existingCaptain) {
    res.status(400).json({ message: "This phone number already exist", status: "fail" });
  } else {
    const newCaptain = await Captain.create(data);

    res.status(200).json({
      status: "success",
      message: "Captain registered successfully",
      data: newCaptain,
    });
  }
});

export const login = catchAsyncError(async (req, res, next) => {
  try {
    const { phoneNumber} = req.body;
    const existingUser = await Captain.findOne({ phoneNumber });
    if (!existingUser) {
      res.status(400).json({ message: "phone number not exist", status: "fail" });
    }
    res.status(200).json({
      status: "success",
      message: "User login successfully",
      data: existingUser,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});