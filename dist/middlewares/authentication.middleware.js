"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
// check token
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/env/index"));
const SECRET = index_1.default.JWT_SECRET_KEY;
const checkToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'You are not logged in!',
                data: null
            });
        }
        if (authorization) {
            const getAuthorization = authorization.split(' ')[1];
            const walletOwner = jsonwebtoken_1.default.verify(getAuthorization, SECRET);
            if (!walletOwner) {
                return res.status(401).json({
                    status: 'error',
                    code: 403,
                    message: 'You are not authorized to make this request!',
                    data: null
                });
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkToken = checkToken;
