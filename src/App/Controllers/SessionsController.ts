import { Response, Request } from 'express'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import AuthenticateUserService from '../Services/AuthenticateUserService'

class SessionsController {
  private service: AuthenticateUserService
  private dedRes: SecResponse

  constructor() {
    this.service = new AuthenticateUserService()
    this.dedRes = new SecResponse()
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const session = await this.service.execute({
      email: request.body.email,
      password: request.body.password,
    })

    delete session.user.password
    return response.json(
      this.dedRes.withOne(session, 'User successfully logged in'),
    )
  }
}

export default SessionsController
