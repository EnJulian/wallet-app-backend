// import express, { Express, Request, Response } from 'express'

// import mongoose from 'mongoose'
// import config from './config'
// const app = express()

// app.get('/', (req, res) => {
//   console.log('Welcome Message')
// })

// app.use((req, res) => res.status(404).json({
//   message: 'Not found'
// }))

// const PORT: number = config.PORT as unknown as number || 8000
// mongoose.connect(config.MONGO_DB!)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log('Mongo DB connected Successfully')
//       console.log(`Server started on http://localhost:${PORT}`)
//     })
//   }).catch((err: any) => {
//     console.log(err)
//     process.exit(1)
//   })

import ap1Version1 from './config/versioning/v1'
import router from './routes/user.routes'

import {
  notFound,
  appErrorHandler,
  genericErrorHandler
} from './middlewares/error.middleware'
import express from 'express'

import connectDB from './config/database.config'

// require('./config/database.config')

const app = express()
const PORT = process.env.PORT === null ? 5000 : process.env.PORT

// connect to db
void connectDB()
app.use(express.json())

app.listen(PORT, () => {
  console.log('Application running on port', PORT)
})

app.use('/api/v1', ap1Version1)
app.use(appErrorHandler)
app.use(genericErrorHandler)
app.use(notFound)
app.use('/api/v1',router)

module.exports = app
