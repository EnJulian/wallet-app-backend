import dotenv from 'dotenv'
dotenv.config()

const development = {
  DATABASE_URL: process.env.MONGO_URI!,
  APP_PORT: process.env.PORT!,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!

}

export default development
