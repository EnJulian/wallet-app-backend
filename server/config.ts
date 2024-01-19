import dotenv from "dotenv";

dotenv.config();

const config = {
    ...process.env,
    PORT: process.env.PORT,
    MONGO_DB: process.env.MONGO_DB
};
export default config;
