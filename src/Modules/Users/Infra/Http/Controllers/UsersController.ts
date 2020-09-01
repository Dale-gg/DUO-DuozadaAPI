import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateUserService from '@Modules/Users/Services/CreateUserService'
import ListAllUsersByFilters from '@Modules/Users/Services/ListAllUsersByFilters'

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listAllService = container.resolve(ListAllUsersByFilters)

    const user = await listAllService.execute({
      user_id,
    })

    return response.json(classToClass(user))
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, lanes, champions, elo } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password,
      lanes,
      champions,
      elo,
    })

    return response.json(classToClass(user))
  }
}
