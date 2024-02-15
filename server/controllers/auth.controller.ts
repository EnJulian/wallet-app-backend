
import { Request, Response } from 'express';
import  User  from '../models/User';
//import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/env';



export const forgotPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    // Checking if email exists in the database
    const client = await User.findOne({ email: req.body.email });

    // Handling case where the user does not exist
    if (!client)
      return res.status(404).json({ message: 'Email does not exist.', status: 'error' });

    // Generate a random token for the client
    const token = jwt.sign({
      id: client.id,
      email: client.email
    }, config.JWT_SECRET_KEY, { expiresIn: '1d' });
    // const generatedToken = crypto.randomBytes(32);

    // Check for error in generating token
    if (!token) {
      return res.status(500).json({
        message: 'An error occurred. Please try again later.',
        status: 'error',
      });
    }
    

    // Set the token and expiring period for the token in the client schema
    client.resetToken = token;
    

    // save the newly generated token in the database
    try {
      const saveToken = await client.save();
      return res.status(200).json({
        message: 'Add your client URL that handles reset password',
        data: {
          resetToken: saveToken.resetToken,
        },
        status: 'success',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `An error occurred while trying to save the token -> ${error}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `An error occurred -> ${error}`,
    });
  }
};

interface DecodedJwtPayload {
  email: string;
  // Add other properties if needed
}

// Reset password
export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { newPassword, confirmPassword, token } = req.body;

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'New password and confirm password do not match',
        status: 'error',
      });
    }

    // Hash the new password
    const hashedPwd = await bcrypt.hash(newPassword, 10);

    // Verify the token and cast it to DecodedJwtPayload
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY) as DecodedJwtPayload;

    // Find the user by email
    const user = await User.findOne({ email: decoded.email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 'error',
      });
    }

    // Update user password and clear reset token fields
    user.password = hashedPwd;

    // Save the updated user information
    await user.save();

    // Send success response
    return res.status(200).json({
      message: 'Password successfully reset',
      status: 'success',
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `An error occurred while trying to reset your password`,
    });
  }
};
