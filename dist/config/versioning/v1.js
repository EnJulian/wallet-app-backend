"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../../routes/user.routes"));
const api = express_1.default.Router();
api.get('/', (req, res) => res.status(200).json({
    status: 'success',
    message: 'Welcome to Wallet API'
}));
// TODO create wallet user api
api.use('/wallet', user_routes_1.default);
exports.default = api;
