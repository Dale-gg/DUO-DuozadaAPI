import { Router } from 'express'
import appConfig from '@Config/app'

import sessionsRouter from '@Domain/Users/Infra/Routes/sessions.routes'
import usersRouter from '@Domain/Users/Infra/Routes/users.routes'
import passwordRouter from '@Domain/Users/Infra/Routes/password.routes'
import profileRouter from '@Domain/Users/Infra/Routes/profile.routes'

class Routes {
  public router: Router

  constructor() {
    this.router = Router()
    this.SetupRoutes()
  }

  public SetupRoutes(): any {
    const welcome = (): any => {
      return {
        greeting: `Welcome to ${appConfig.name} API!`,
        version: appConfig.version,
      }
    }

    this.router.use('/', welcome)
    this.router.use('/sessions', sessionsRouter)
    this.router.use('/users', usersRouter)
    this.router.use('/password', passwordRouter)
    this.router.use('/profile', profileRouter)
  }
}

export default new Routes().router
