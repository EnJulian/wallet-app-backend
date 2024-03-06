import ap1Version1 from './config/versioning/v1'
import router from './routes/user.routes'
import cors from 'cors';
import { swaggerDocs } from './utils/swagger';
import bodyParser from 'body-parser';
import helmet from 'helmet';


import {
  notFound,
  appErrorHandler,
  genericErrorHandler
} from './middlewares/error.middleware'
import express from 'express'

import connectDB from './config/database.config'


const app = express()
const PORT = process.env.PORT === null ? 5000 : process.env.PORT

// connect to db
void connectDB()

app.use(express.json())

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// secure headers
app.use(helmet());
app.disable('x-powered-by');


app.listen(PORT, () => {
  console.log('Application running on port', PORT)
})

void swaggerDocs(router)
app.use(ap1Version1)
app.use(appErrorHandler)
app.use(genericErrorHandler)
app.use(notFound)


app.use(router)


export default app;
