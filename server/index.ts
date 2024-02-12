import ap1Version1 from './config/versioning/v1'
import router from './routes/user.routes'
import cors from 'cors';

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

app.listen(PORT, () => {
  console.log('Application running on port', PORT)
})

app.use('/api/v1', ap1Version1)
app.use(appErrorHandler)
app.use(genericErrorHandler)
app.use(notFound)
app.use('/api/v1',router)

export default app;
