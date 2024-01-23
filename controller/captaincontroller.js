import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Captain } from "../model/CaptainSchema.js";

export const register = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const phoneNumber = data?.phoneNumber;
  const existingCaptain = await Captain.findOne({ phoneNumber });
  if (existingCaptain) {
    res.status(201).json({
      success: "success",
      status:201,
      message: "User login successfully",
      data: existingUser,
    });
  } else {
    const newCaptain = await Captain.create(data);

    res.status(200).json({
      success: "success",
      status:200,
      message: "Captain registered successfully",
      data: newCaptain,
    });
  }
});
