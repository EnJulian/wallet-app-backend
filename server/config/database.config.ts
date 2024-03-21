import mongoose from 'mongoose';
import config from './env/index';
import Logger from '../config/logger';

const connectDB = async () => {
  const logger = new Logger(connectDB.name);
  try {
    await mongoose.connect(config.DATABASE_URL!, {
      autoIndex:true,

    });

    console.log('Connected to MongoDb database! ...');
    logger.log('Connected to MongoDb database! ...');

  } catch (err) {
    console.log(`An error has occurred connecting to MongoDb: ${err}`);
    logger.log(`An error has occurred connecting to MongoDb : ${err}`);
  }
};

export default connectDB;
