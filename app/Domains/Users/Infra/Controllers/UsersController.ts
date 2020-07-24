import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@Domain/Users/Infra/Services/CreateUserService'

export default class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password

    return response.json(user)
  }
}
