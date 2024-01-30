"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("./config/versioning/v1"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
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
app.use('/api/v1', user_routes_1.default);
module.exports = app;
