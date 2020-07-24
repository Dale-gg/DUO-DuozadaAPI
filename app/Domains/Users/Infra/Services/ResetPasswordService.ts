import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import AppError from '@Exceptions/AppError'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import IUserTokensRepository from '@Domain/Users/Infra/Repositories/IUserTokensRepository'
import IHashHelper from '@Utils/Helpers/Hash/Models/IHashHelper'

interface IRequest {
  token: string
  password: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashHelper')
    private hashHelper: IHashHelper,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashHelper.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default SendForgotPasswordEmailService
