import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@Domain/Users/Infra/Services/AuthenticateUserService'

export default class SessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    delete user.password

    return response.json({ user, token })
  }
}
