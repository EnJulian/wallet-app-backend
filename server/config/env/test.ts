import dotenv from 'dotenv'

dotenv.config()

const test = {
  DATABASE_URL: process.env.MONGO_URI!,
  APP_PORT: process.env.PORT!,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
  GMAIL_APP_USER: process.env.NODEJS_GMAIL_APP_USER!,
  GMAIL_APP_PASSWORD: process.env.NODEJS_GMAIL_APP_PASSWORD!
}

export default test
