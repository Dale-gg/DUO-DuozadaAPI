/* eslint-disable prettier/prettier */
import { Response, Request } from 'express'
import CreateUserService from '../Services/CreateUserService'
import ListUsersService from '../Services/ListUsersServices'
import DeleteUserService from '../Services/DeleteUserService'
import UpdateUserService from  '../Services/UpdateUserService'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'

const responseDedsec = new SecResponse()

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService()

    const user = await createUser.execute(request.body)

    delete user.password

    const res = responseDedsec.withOne(user, 'User successfully registered')
    return response.json(res)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService()

    const users = await listUser.allUsers()

    const res = responseDedsec.withCollection(users)
    return response.json(res)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService()
    
    const user = await listUser.userById(request.params.id)
    
    const res = responseDedsec.withOne(user)
    return response.json(res)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUser = new UpdateUserService()

    const user = await updateUser.execute(request.body, request.params.id)

    const res = responseDedsec.withOne(user)
    return response.json(res)
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const deleteUser = new DeleteUserService()

    await deleteUser.execute(request.params.id)

    const res = responseDedsec.withoutBody('User deleted')
    return response.json(res)
  }
}

export default UsersController
