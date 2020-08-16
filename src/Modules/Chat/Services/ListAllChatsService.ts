import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import { injectable, inject } from 'tsyringe'
import IChatsRepository from '@Modules/Chat/Repositories/IChatsRepository'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import AppError from '@Shared/Errors/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class ListAllChatsService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Chat[]> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const chats = await this.chatsRepository.all(user_id)

    return chats
  }
}

export default ListAllChatsService
