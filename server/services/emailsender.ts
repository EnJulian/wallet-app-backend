import { Request, Response } from "express";
import nodemailer from "nodemailer"; // sending emails to clients
import Mailgen from "mailgen"; // responsive html email that can be seen using nodemailer

export const sendCustomizedEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7d78fe69d1fb07",
        pass: "2e69ce8c2d4307",
      },
    });

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "BIG SIX WALLET",
        link: " ",
      },
    });

    const response = {
      body: {
        name: "Name",
        intro:
          "Welcome to Wallet System! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with our Wallet System if you've forgotten your password no need to worry, please click here to reset your password:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Reset your password",
            link: "",
          },
        },
      },
    };

    const emailTemplate = mailGenerator.generate(response);

    const mailOptions = {
      from: "jacklinetimah57@gmail.com",
      to: "recipient@example.com",
      subject: "Welcome to our Wallet System",
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
