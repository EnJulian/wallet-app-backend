"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = void 0;
const User_1 = __importDefault(require("../models/User"));
//import crypto from 'crypto';
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
//import nodemailer from 'nodemailer';
const forgotPassword = async (req, res) => {
    try {
        // Checking if email exists in the database
        const client = await User_1.default.findOne({ email: req.body.email });
        // Handling case where the user does not exist
        if (!client)
            return res.status(404).json({ message: 'Email does not exist.', status: 'error' });
        // Generate a random token for the client
        const token = jsonwebtoken_1.default.sign({
            id: client.id,
            email: client.email
        }, env_1.default.JWT_SECRET_KEY, { expiresIn: '1d' });
        // const generatedToken = crypto.randomBytes(32);
        // Check for error in generating token
        if (!token) {
            return res.status(500).json({
                message: 'An error occurred. Please try again later.',
                status: 'error',
            });
        }
        // Converting the token to a hex string
        // const convertTokenToHexString = generatedToken.toString('hex');
        // Set the token and expiring period for the token in the client schema
        client.resetToken = token;
        // client.expireToken = (Date.now() + 600000) as unknown as string; // 1 minutes
        // save the newly generated token in the database
        try {
            const saveToken = await client.save();
            return res.status(200).json({
                message: 'Add your client URL that handles reset password',
                data: {
                    resetToken: saveToken.resetToken,
                    // expireToken: saveToken.expireToken,
                },
                status: 'success',
            });
        }
        catch (error) {
            return res.status(500).json({
                status: false,
                message: `An error occurred while trying to save the token -> ${error}`,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: `An error occurred -> ${error}`,
        });
    }
};
exports.forgotPassword = forgotPassword;
// Reset password
const resetPassword = async (req, res) => {
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
        const hashedPwd = await bcrypt_1.default.hash(newPassword, 10);
        // Verify the token and cast it to DecodedJwtPayload
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET_KEY);
        // Find the user by email
        const user = await User_1.default.findOne({ email: decoded.email });
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
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: `An error occurred while trying to reset your password`,
        });
    }
};
exports.resetPassword = resetPassword;
