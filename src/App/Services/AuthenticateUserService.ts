import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import User from '../Models/User'
import { sign } from 'jsonwebtoken'
import authConfig from '../Config/auth'
import AppError from '../Errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

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
