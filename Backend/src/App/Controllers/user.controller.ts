import * as express from 'express'
import UserService from '../Services/user.service'

export default class UserController {
  public router = express.Router()
  public path = '/api/v1/'
  private userService: UserService

  constructor () {
    this.userService = new UserService()
    this.setupRoutes()
  }

  public setupRoutes () {
    this.router.get(`${this.path}users`, this.userService.index)
    this.router.post(`${this.path}users`, this.userService.store)
    // this.router.post(`${this.path}login`, this.userService.login)
    // this.router.delete(`${this.path}users/:id`, this.userService.destroy)
  }
}
