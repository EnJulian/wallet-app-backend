/* eslint-disable @typescript-eslint/no-explicit-any */
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { applicantForgotPasswordMail } from "../EmailSender.template";
import Logger from '../config/logger';

dotenv.config();

const sendGridKey: string | undefined = process.env.WALLET_SENDGRID_API_KEY;

if (!sendGridKey) {
  Logger.error(`[API_KEY_MISSING]`)
  process.exit(1);
}

// Set up SendGrid API key
sgMail.setApiKey(sendGridKey);

/**
 * Sends a reset password email to the specified email address.
 * @param email The email address to send the reset password email to.
 * @returns A promise that resolves when the email is sent.
 */
export async function sendResetPasswordEmail(email: string): Promise<any> {
  // Get the HTML content from the email template
  const firstName = ""; // Placeholder for firstName,
  const token = ""; // Placeholder for token, 
  const emailContent = applicantForgotPasswordMail(firstName, token);

  // Set up SendGrid API key
  sgMail.setApiKey(process.env.WALLET_SENDGRID_API_KEY || "");

  // Create the message object
  const message = {
    to: email,
    from: {
      name: "ALBERT OSEI",
      email: process.env.WALLET_EMAIL || "",
    },
    subject: "RESET PASSWORD",
    text: "Reset your password",
    html: emailContent,
  };

  try {
    await sgMail.send(message);
    Logger.info(`[SEND_EMAIL_SUCCESS] `)

    // If running in test environment, resolve with success
    if (process.env.NODE_ENV === "test") {
      return new Promise((resolve) => {
        resolve("success");
      });
    }
  } catch (error: any) {
    // Specify 'any' as the error type
    // Use error.message directly
    Logger.error(
      `[SEND_EMAIL_FAILED]`,
      error,
    );
    throw new Error("Failed to send email.");
  }
}
