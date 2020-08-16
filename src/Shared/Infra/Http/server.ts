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
import { setupWebSocket } from '../Ws/websocket'

import AppError from '@Shared/Errors/AppError'

import '@Shared/Infra/Typeorm'
import '@Shared/Container'

const app = express()

const server = http.createServer(app)
setupWebSocket(server)

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
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

server.listen(3333, () => {
  console.log(
    `🚀 [HTPP] Server is listening on port ${process.env.PORT || 3333} 🤯`,
  )
})
