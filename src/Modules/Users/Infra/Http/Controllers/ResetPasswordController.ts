import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '@Modules/Users/Services/ResetPasswordService'

export default class ResetPasswordController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const resetPassword = container.resolve(ResetPasswordService)

    await resetPassword.execute({
      token,
      password,
    })

    return response.status(204).json()
  }
}
