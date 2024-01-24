"use strict";
// import express, { Express, Request, Response } from 'express'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose from 'mongoose'
// import config from './config'
// const app = express()
// app.get('/', (req, res) => {
//   console.log('Welcome Message')
// })
// app.use((req, res) => res.status(404).json({
//   message: 'Not found'
// }))
// const PORT: number = config.PORT as unknown as number || 8000
// mongoose.connect(config.MONGO_DB!)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log('Mongo DB connected Successfully')
//       console.log(`Server started on http://localhost:${PORT}`)
//     })
//   }).catch((err: any) => {
//     console.log(err)
//     process.exit(1)
//   })
const v1_1 = __importDefault(require("./config/versioning/v1"));
const error_middleware_1 = require("./middlewares/error.middleware");
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
// require('./config/database.config')
const app = (0, express_1.default)();
const PORT = process.env.PORT === null ? 5000 : process.env.PORT;
// connect to db
void (0, database_config_1.default)();
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log('Application running on port', PORT);
});
app.use('/api/v1', v1_1.default);
app.use(error_middleware_1.appErrorHandler);
app.use(error_middleware_1.genericErrorHandler);
app.use(error_middleware_1.notFound);
module.exports = app;
