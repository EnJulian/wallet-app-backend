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
exports.authenticate = exports.verifyToken = exports.checkToken = exports.checkAuthorizationToken = void 0;
const dotenv = __importStar(require("dotenv"));
// import { CustomRequest } from '../repository/userDataType';
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv.config();
const checkAuthorizationToken = (authorization) => {
    let bearerToken = null;
    if (authorization) {
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }
    return bearerToken;
};
exports.checkAuthorizationToken = checkAuthorizationToken;
const checkToken = (req) => {
    const { headers: { authorization } } = req;
    const bearerToken = (0, exports.checkAuthorizationToken)(authorization);
    return req.body.refreshToken
        ? req.body.refreshToken
        : bearerToken ||
            req.headers['x-access-token'] ||
            req.headers.token ||
            req.body.token;
};
exports.checkToken = checkToken;
const verifyToken = (token, JWT_SECRET_KEY) => {
    return (0, jsonwebtoken_1.verify)(token, JWT_SECRET_KEY);
};
exports.verifyToken = verifyToken;
const authenticate = (req, res, next) => {
    try {
        const token = (0, exports.checkToken)(req);
        if (!token) {
            return res.status(400).json({
                code: 404,
                status: 'error',
                message: 'bearer token is required',
                data: null
            });
        }
        const data = (0, exports.verifyToken)(token, process.env.JWT_SECRET_KEY);
        if (!data) {
            return {
                code: 401,
                status: 'error',
                message: 'data does not exist',
            };
        }
        Object.assign(req, { data });
        return next();
    }
    catch (err) {
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'invalid token',
            data: null
        });
    }
};
exports.authenticate = authenticate;
