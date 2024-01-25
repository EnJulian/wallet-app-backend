"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = Object.assign(Object.assign({}, process.env), { PORT: process.env.PORT, MONGO_DB: process.env.MONGO_DB });
exports.default = config;
