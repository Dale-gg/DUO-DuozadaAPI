import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'

import routes from './Routes'
import { errors } from 'celebrate'
import uploadConfig from '@Config/upload'
import rateLimiter from './Middlewares/rateLimiter'
import http from 'http'

import '@Shared/Infra/Typeorm'
import '@Shared/Container'

import AppError from '@Shared/Errors/AppError'

import { setupWebSocket } from '../Ws/websocket'

const app = express()

const server = http.createServer(app)

app.use(rateLimiter)
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use(errors)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  } else if (err.joi) {
    return response.status(403).json({
      status: 'error',
      message: err.joi.details,
    })
  } else if (process.env.NODE_ENV === 'production') {
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  } else {
    console.log(err)

    return response.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
})

setupWebSocket(server)

server.listen(process.env.PORT, () => {
  console.log(`🚀 [HTPP] Server is listening on port ${process.env.PORT} 🤯`)
})
