"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const test = {
    DATABASE_URL: process.env.MONGO_URI,
    APP_PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};
exports.default = test;
