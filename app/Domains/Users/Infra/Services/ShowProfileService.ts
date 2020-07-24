import User from '@Domain/Users/Infra/Entities/User'
import { injectable, inject } from 'tsyringe'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import AppError from '@Exceptions/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    return this.usersRepository.save(user)
  }
}

export default ShowProfileService
