"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// import validator from 'validator'
// TODO generate user account number - unique, 10 digits
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, 'provide a name'],
        index: true
    },
    surname: {
        type: String,
        required: [true, 'provide a name'],
        index: true
    },
    othernames: {
        type: String,
        required: false,
        index: true,
        default: ''
    },
    phonenumber: {
        type: String,
        required: [true, 'provide phone number'],
        index: true
    },
    password: {
        type: String,
        required: true,
        select: true,
        minlength: [8, 'the password require more than 8 characters']
    },
    resetToken: {
        type: String,
        index: true
    },
    expireToken: {
        type: String,
        index: true
    },
    resetPasswordExpires: {
        type: String,
        index: true
    },
    resetPasswordToken: {
        type: String,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'provide email'],
        unique: true,
        index: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    DollarWallet: {
        type: Number,
        default: 0
    },
    NairaWallet: {
        type: Number,
        default: 0
    },
    pin: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
});
// export default UserSchema;
exports.default = mongoose_1.default.model('User', userSchema);
