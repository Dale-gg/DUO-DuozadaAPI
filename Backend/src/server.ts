import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

import App from './bootstrap.app'
import * as bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import myMiddleware from './App/Middlewares/log.middleware'
import UserController from './App/Controllers/user.controller'

configDotenv({
  path: resolve(__dirname, '../.env')
})

const app = new App({
  port: process.env.PORT || 3333,
  middlewares: [
    cors(),
    morgan('dev'),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    myMiddleware
  ],
  controllers: [
    new UserController()
  ]
})

app.listen()
