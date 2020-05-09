/* eslint-disable prettier/prettier */
import { Response, Request } from 'express'
import CreateUserService from '../Services/CreateUserService'
import ListUsersService from '../Services/ListUsersServices'
import DeleteUserService from '../Services/DeleteUserService'
import UpdateUserService from  '../Services/UpdateUserService'

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService()

    const user = await createUser.execute(request.body)

    delete user.password

    return response.json(user)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService()

    const users = await listUser.allUsers()

    return response.json({ users })
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService()
    
    const user = await listUser.userById(request.params.id)
    
    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUser = new UpdateUserService()

    const user = await updateUser.execute(request.body, request.params.id)

    return response.json(user)
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const deleteUser = new DeleteUserService()

    await deleteUser.execute(request.params.id)

    return response.json('User excluido')
  }
}

export default UsersController
