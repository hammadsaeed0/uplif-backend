import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Captain } from "../model/CaptainSchema.js";

export const register = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const phoneNumber = data?.phoneNumber;
  const existingCaptain = await Captain.findOne({ phoneNumber });
  if (existingCaptain) {
    res.status(201).json({
      success: true,
      message: "User login successfully",
      data: existingUser,
    });
  } else {
    const newCaptain = await Captain.create(data);

    res.status(201).json({
      success: true,
      message: "Captain registered successfully",
      data: newCaptain,
    });
  }
});
