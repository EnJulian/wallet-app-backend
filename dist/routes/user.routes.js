"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const router = express_1.default.Router();
router.post('/signup', validator_middleware_1.validateUserSignUpInput, user_controller_1.createWalletUser);
router.post('/login', validator_middleware_1.validateLoginInput, user_controller_1.loginWalletUser);
exports.default = router;
