import { Router } from 'express'

import sessions from './sessions.routes'
import users from './users.routes'
import welcome from './welcome.routes'

export default class Routes {
  public router = Router()
  private path = process.env.APP_PREFIX

  constructor() {
    this.setupRoutes()
  }

  public setupRoutes(): any {
    this.router.use(`${this.path}/users`, users)
    this.router.use(`${this.path}/sessions`, sessions)
    this.router.use('/', welcome)
  }
}
