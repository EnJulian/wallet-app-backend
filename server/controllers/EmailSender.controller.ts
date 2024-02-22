import { Request, Response } from "express";
import User from "../models/User";
import { sendResetPasswordEmail } from "../services/EmailSenderLink.service";

export const ResetPasswordEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email} = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });

    // If user is not found, return error
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", status: "error" });
    }

    // Send reset password email
    await sendResetPasswordEmail(email);

    // Assuming the email sending logic is successful
    return res.status(200).json({
      message: "Reset password link sent successfully.",
      status: "success",
    });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};
