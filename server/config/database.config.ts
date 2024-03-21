import mongoose from 'mongoose';
import config from './env/index';

const connectDB = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL!, {
      autoIndex:true,

    });

    console.log('MongoDb Connected!');
  } catch (err) {
    console.log(`An error has occurred: ${err}`);
    process.exit(1);    
  }
};

export default connectDB;
