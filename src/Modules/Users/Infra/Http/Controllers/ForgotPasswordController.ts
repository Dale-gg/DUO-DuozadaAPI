import { Request, Response } from 'express'
import { container } from 'tsyringe'

import SendForgotPasswordEmailService from '@Modules/Users/Services/SendForgotPasswordEmailService'

export default class ForgotPasswordController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    )

    await sendForgotPasswordEmail.execute({
      email,
    })

    return response.status(204).json()
  }
}
