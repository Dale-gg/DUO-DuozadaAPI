import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import { injectable, inject } from 'tsyringe'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

@injectable()
class ListAllUsersByFilters {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.allWithLikeFilter(user_id)

    return users
  }
}

export default ListAllUsersByFilters
