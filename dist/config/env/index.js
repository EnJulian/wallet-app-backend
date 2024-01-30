"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const development_1 = __importDefault(require("./development"));
const test_1 = __importDefault(require("./test"));
const production_1 = __importDefault(require("./production"));
const environment = {
    development: development_1.default,
    test: test_1.default,
    production: production_1.default
};
const currentEnvironment = process.env.NODE_ENV;
console.log(currentEnvironment);
// TODO get the node env from the object
const config = environment[currentEnvironment];
console.log(config);
exports.default = config;
