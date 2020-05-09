import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './Routes'
import uploadConfig from './Config/upload'

import AppError from './Errors/AppError'

import createConnection from './Database'

createConnection()

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  if (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'development') {
      return response.status(500).json({
          status: 'error',
          message: err.message
      })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

export default app