import ap1Version1 from './config/versioning/v1'
import router from './routes/user.routes'
import cors from 'cors';
import { swaggerDocs } from './utils/swagger';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import Logger from './config/logger';
import { morganMiddleware } from './config/logger';


import {
  notFound,
  appErrorHandler,
  genericErrorHandler
} from './middlewares/error.middleware'
import express from 'express'

import connectDB from './config/database.config'


const app = express()
const PORT = process.env.PORT === null ? 5000 : process.env.PORT
const Env = process.env.NODE_ENV || 'development'

// connect to db
void connectDB()

app.use(express.json())

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// secure headers
app.use(helmet());
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, Content-Type, Accept'
  );
  next();
});

app.listen(PORT, () => {
  console.log('Application running on port', PORT)
})

const logger = new Logger(app.name);

  Env !== 'production' &&
      logger.log(`listening on http://localhost:${PORT}`);


app.use(morganMiddleware);

void swaggerDocs(router)
app.use('/api/v1', ap1Version1)
app.use(appErrorHandler)
app.use(genericErrorHandler)
app.use(notFound)


app.use(router)


export default app;
