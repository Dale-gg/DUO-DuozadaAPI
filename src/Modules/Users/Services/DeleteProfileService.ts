import { injectable, inject } from 'tsyringe'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import AppError from '@Shared/Errors/AppError'

@injectable()
class DeleteProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    user.status = false

    await this.usersRepository.save(user)
  }
}

export default DeleteProfileService
