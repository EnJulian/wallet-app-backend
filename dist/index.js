"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const config_1 = __importDefault(require("./config"));
app.get('/', (req, res) => {
    console.log(`Welcome Message`);
});
app.use((req, res) => res.status(404).json({
    message: "Not found",
}));
const PORT = config_1.default.PORT || 8000;
mongoose_1.default.connect(config_1.default.MONGO_DB)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Mongo DB connected Successfully`);
        console.log(`Server started on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
