import { injectable, inject } from 'tsyringe'
import User from '@Domain/Users/Infra/Entities/User'
import IHashHelper from '@Utils/Helpers/Hash/Models/IHashHelper'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import AppError from '@Exceptions/AppError'

interface IRequest {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashHelper')
    private hashHelper: IHashHelper,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      )
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashHelper.compareHash(
        old_password,
        user.password,
      )

      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }

      user.password = await this.hashHelper.generateHash(password)
    }

    return this.usersRepository.save(user)
  }
}

export default UpdateProfileService
