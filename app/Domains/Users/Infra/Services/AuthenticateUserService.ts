import User from '@Domain/Users/Infra/Entities/User'
import { sign } from 'jsonwebtoken'
import authConfig from '@Config/auth'
import AppError from '@Exceptions/AppError'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe'
import IHashHelper from '@Utils/Helpers/Hash/Models/IHashHelper'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashHelper')
    private hashHelper: IHashHelper,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await this.hashHelper.compareHash(
      password,
      user.password,
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}

export default AuthenticateUserService
