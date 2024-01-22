import mongoose from 'mongoose'
import config from './env/index'

const connectDB = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL)
    console.log('MongoDb Connected!')
  } catch (err) {
    console.log(`an error has occurred ${err}`)
  }
}

export default connectDB
