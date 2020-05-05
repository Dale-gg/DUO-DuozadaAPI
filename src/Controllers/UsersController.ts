import { Response, Request } from 'express'
import CreateUserService from '../Services/CreateUserService'
import ListUsersService from '../Services/ListUsersServices'

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService()

    const user = await createUser.execute(request.body)

    delete user.password

    return response.json(user)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService()

    const user = await listUser.allUsers()

    return response.json(user)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService()

    const user = await listUser.userById(request.params.id)

    return response.json(user)
  }
}

export default UsersController
