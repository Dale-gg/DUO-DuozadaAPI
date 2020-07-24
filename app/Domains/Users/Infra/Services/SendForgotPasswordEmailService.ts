import { injectable, inject } from 'tsyringe'
import path from 'path'

import AppError from '@Exceptions/AppError'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import IMailHelper from '@Utils/Helpers/Mail/Models/IMailHelper'
import IUserTokensRepository from '@Domain/Users/Infra/Repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailHelper')
    private mailHelper: IMailHelper,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    )

    await this.mailHelper.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[@bootstrap/expressts] Recuperação de senha',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    })
  }
}

export default SendForgotPasswordEmailService
