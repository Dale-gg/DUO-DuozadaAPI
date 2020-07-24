import 'reflect-metadata'
import 'express-async-errors'
import '@Config/env'

import cors from 'cors'

import Routes from '@Start/routes'
import appConfig from '@Config/app'
import Application from '@Start/app'
import corsConfig from '@Config/cors'
import { EnvClass } from '@Start/kernel'
import Connection from '@Database/connection'
import GuardMiddleware from '@Utils/Middlewares/GuardMiddleware'

export default new Application({
  middlewares: [cors(corsConfig), GuardMiddleware],
  routes: [Routes],
  port: new EnvClass().get('PORT', 3333),
  database: new Connection(),
  name: appConfig.name,
  prefix: appConfig.prefix,
})
