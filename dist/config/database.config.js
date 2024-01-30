"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./env/index"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(index_1.default.DATABASE_URL, {
            autoIndex: true,
        });
        console.log('MongoDb Connected!');
    }
    catch (err) {
        console.log(`An error has occurred: ${err}`);
    }
};
exports.default = connectDB;
