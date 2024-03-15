/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import User from "../models/User";
import { sendResetPasswordEmail } from "../services/EmailSenderLink.service";
import Logger from "../config/logger";

export const ResetPasswordEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email} = req.body;
    Logger.info(`[RESET_PASSWORD] by ${email}`)
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
    Logger.info(`[RESET_PASSWORD_SUCCESS] by ${email}`)
    return res.status(200).json({
      message: "Reset password link sent successfully.",
      status: "success",
    });
  } catch (error) {
    Logger.error(`[RESET_PASSWORD_FAILED]`, (error as Error).message)
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};
